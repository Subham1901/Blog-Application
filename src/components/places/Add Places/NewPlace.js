import React, { useContext, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Box,
  Button,
  Heading,
  Image,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { TiFolderAdd } from "react-icons/ti";
import { authContext } from "../../Auth/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewPlace() {
  const auth = useContext(authContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [file, setFile] = useState();
  const [previewURL, setPreviewURL] = useState();
  const [loading, setLoading] = useState(false);
  const [placeData, setPlaceData] = useState({
    title: "",
    description: "",
    image: "",
    address: "",
    creator: auth.userId,
  });

  const handleChange = (event) => {
    setPlaceData({ ...placeData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewURL(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const handleCreatePlace = async (event) => {
    setLoading(true);
    event.preventDefault();
    placeData.image = file;
    const formData = new FormData();
    formData.append("title", placeData.title);
    formData.append("description", placeData.description);
    formData.append("image", placeData.image);
    formData.append("address", placeData.address);
    formData.append("creator", auth.userId);

    console.log(auth.token);
    await axios
      .post(
        "https://blog-app-backend-rest.herokuapp.com/blog/place/",
        formData,
        {
          headers: { token: auth.token },
        }
      )
      .then(
        (res) => {
          setLoading(false);
          toast({
            description: res.data.message,
            duration: 1000,
            isClosable: true,
            status: "success",
          });
          navigate(`/${auth.userId}/places`);
        },
        (err) => {
          setLoading(false);
          toast({
            description: err.response.data.message,
            duration: 1000,
            isClosable: true,
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
    <VStack m={10}>
      <Heading color={"green"}>
        Post your favourite places in the world here.
      </Heading>
      <Box w={["sm", "md"]} p="17" m={"10"}>
        <form onSubmit={handleCreatePlace}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={placeData.title}
              onChange={handleChange}
              focusBorderColor="none"
              border={"1px solid black !important"}
              type="text"
            />
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              onChange={handleChange}
              focusBorderColor="none"
              border={"1px solid black !important"}
              type="text"
            />
            <FormLabel>Image</FormLabel>

            <Input
              name="image"
              p={1}
              focusBorderColor="none"
              placeholder="Paste Your Image Link"
              border={"1px solid black !important"}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Image src={previewURL} />
            <FormLabel>Address</FormLabel>
            <Input
              value={placeData.address}
              name="address"
              onChange={handleChange}
              focusBorderColor="none"
              border={"1px solid black !important"}
              type="text"
            />
            <FormLabel>Creator</FormLabel>
            <Input
              onChange={handleChange}
              isDisabled
              name="creator"
              value={auth.userId}
              focusBorderColor="none"
              border={"1px solid black !important"}
              type="text"
            />
            <Button
              leftIcon={<TiFolderAdd size={20} />}
              type="submit"
              width={"100%"}
              mt="6"
              colorScheme={"blue"}
            >
              Create Place
            </Button>
          </FormControl>
        </form>
      </Box>
    </VStack>
  );
}

export default NewPlace;
