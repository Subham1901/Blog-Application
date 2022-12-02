import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../../Auth/AuthContext";

function UpdatePlace() {
  const { uid } = useParams();

  const navigate = useNavigate();
  const auth = useContext(authContext);
  const toast = useToast();
  const [place, setPlace] = useState([]);
  const [data, setData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  //!get the place
  const getPlacebuPid = async () => {
    setLoading(true);
    await axios
      .get(
        `https://blog-app-backend-rest.herokuapp.com/blog/place/placebyid/${uid}`
      )
      .then((success) => {
        setPlace(success.data.place);
        setLoading(false);
      });
  };
  useEffect(() => {
    getPlacebuPid();
  }, []);

  //!handle data
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleUpdate = async (event) => {
    setLoading(true);
    event.preventDefault();
    await axios
      .patch(
        `https://blog-app-backend-rest.herokuapp.com/blog/place/${place._id}`,
        data,
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then(
        (res) => {
          setLoading(false);
          navigate(`/${auth.userId}/places`);
          toast({
            description: res.data.message,
            duration: 1000,
            status: "success",
          });
        },
        (err) => {
          setLoading(false);
          toast({
            description: err.response.data.message,
            duration: 1000,
            status: "error",
          });
        }
      );
  };
  if (loading) {
    return (
      <Center>
        <Spinner
          mt={"20%"}
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
    <Box w={["sm", "md"]} margin="auto" p="17" mt={"5"}>
      <Heading textAlign={"center"} mb={5}>
        Update Your Place
      </Heading>
      <Divider />
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          name="title"
          defaultValue={place.title}
          onChange={handleChange}
          focusBorderColor="none"
          border={"1px solid black !important"}
          type="text"
        />
        <FormLabel>Description</FormLabel>
        <Input
          defaultValue={place.description}
          name="description"
          onChange={handleChange}
          focusBorderColor="none"
          border={"1px solid black !important"}
          type="text"
        />
        <Button
          onClick={handleUpdate}
          type="submit"
          width={"100%"}
          mt="6"
          colorScheme={"green"}
        >
          Update Place
        </Button>
      </FormControl>
    </Box>
  );
}

export default UpdatePlace;
