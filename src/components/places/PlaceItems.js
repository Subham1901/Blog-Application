import {
  VStack,
  Image,
  Text,
  HStack,
  Button,
  Box,
  useToast,
  Center,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ImLocation } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Auth/AuthContext";

function PlaceItems(props) {
  const navigate = useNavigate();
  const auth = useContext(authContext);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  //!delete place
  const deletePlace = async (e, pid) => {
    setLoading(true);
    e.preventDefault();
    await axios
      .delete(`https://blog-app-backend-rest.herokuapp.com/blog/place/${pid}`, {
        headers: {
          token: auth.token,
        },
      })
      .then(
        (success) => {
          setLoading(false);
          navigate("/");
          toast({
            description: success.data.message,
            duration: 1000,
            position: "top",
            isClosable: "true",
            status: "success",
          });
        },
        (err) => {
          setLoading(false);
          toast({
            description: err.response.data.message,
            duration: 1000,
            position: "top",
            isClosable: "true",
            status: "error",
          });
        }
      );
  };
  if (loading) {
    return (
      <Center>
        <Spinner
          mt={"50%"}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          height={100}
          width={100}
        />
      </Center>
    );
  }
  return (
    <VStack
      boxShadow={"dark-lg"}
      p={[2, 5]}
      h={["3xl"]}
      w={["sm", "md", "lg"]}
      borderRadius="10px"
      m={(0, "10 !important")}
      display={"flex"}
      justifyContent={["center"]}
      alignItems="center"
    >
      <Image
        h={400}
        src={`https://blog-app-backend-rest.herokuapp.com/${props.imageUrl}`}
        alt={props.title}
      />

      <Text textAlign={"center"} fontWeight={"semibold"} fontSize={"2xl"}>
        {props.title}
      </Text>
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
        padding={4}
        w={["sm", "md", "lg"]}
      >
        <Text>{props.description}</Text>
        <Text fontWeight={700}>Location</Text>
        <ImLocation size={27} />
        <Text>{props.address}</Text>
      </Box>
      <HStack spacing={10}>
        {props.uid == auth.userId && (
          <>
            <Button
              w={"100%"}
              onClick={(e) => deletePlace(e, props.id)}
              colorScheme="red"
            >
              Delete
            </Button>
            <Button w={"100%"} colorScheme="green">
              <Link to={`/${props.id}/edit`}>Edit</Link>
            </Button>
          </>
        )}
      </HStack>
    </VStack>
  );
}

export default PlaceItems;
