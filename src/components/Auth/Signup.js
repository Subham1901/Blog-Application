import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Divider,
  Button,
  useToast,
  Text,
  Avatar,
  Center,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { authContext } from "./AuthContext";
function Signup() {
  const navigate = useNavigate();
  const auth = useContext(authContext);
  const [file, setFile] = useState();
  const [previewURL, setPreviewURL] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [signupData, setsignupData] = useState({
    name: "",
    image: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setsignupData({ ...signupData, [event.target.name]: event.target.value });
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

  //!Hanlde Signup route
  const handleSignup = async (event) => {
    setLoading(true);
    event.preventDefault();
    signupData.image = file;
    const formData = new FormData();
    formData.append("image", signupData.image);
    formData.append("name", signupData.name);
    formData.append("password", signupData.password);
    formData.append("email", signupData.email);
    //!if user not loggedin then only signup request will invoke
    //!validation..............................................
    if (!auth.isLoggedin) {
      if (
        !signupData.email ||
        !signupData.name ||
        !signupData.password ||
        !signupData.image
      ) {
        setLoading(false);
        return toast({
          description: "Invalid Credentials",
          status: "error",
          duration: "1000",
          isClosable: "true",
        });
      }
      if (!validator.isEmail(signupData.email)) {
        setLoading(false);
        return toast({
          description: "Invalid Email Id",
          status: "error",
          duration: "1000",
          isClosable: "true",
        });
      }
      if (signupData.password.length < 5) {
        setLoading(false);
        return toast({
          description: "Password must be 5 character long",
          status: "error",
          duration: "1000",
          isClosable: "true",
        });
      }
      //!Validation end...........................................

      await axios
        .post(
          "https://blog-app-backend-rest.herokuapp.com/blog/user/signup",
          formData
        )
        .then(
          (res) => {
            setLoading(false);
            toast({
              description: "User Created..",
              status: "success",
              duration: "1000",
              isClosable: "true",
            });
            navigate("/login");
          },
          (err) => {
            setLoading(false);
            return toast({
              description: err.response.data.message,
              status: "error",
              duration: "1000",
              isClosable: "true",
            });
          }
        );
    }
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
    <VStack
      p={10}
      m="auto"
      alignItems={"center"}
      alignContent="center"
      width={["sm", "lg"]}
    >
      <Heading>Signup Your Account</Heading>
      <Divider p={2} />
      <form id="place-form" onSubmit={handleSignup}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            width={[300, 400]}
            name="name"
            value={signupData.name}
            onChange={handleChange}
            focusBorderColor="none"
            border={"1px solid black !important"}
            type="text"
          />
          <FormLabel>Profile</FormLabel>
          <Input
            // value={signupData.image}
            onChange={(e) => setFile(e.target.files[0])}
            //onChange={handleChange}
            type="file"
            p={1}
            accept=".jpg,.png,.jpeg"
            name="image"
          />
          {previewURL && (
            <Center>
              <Avatar m="2" size={"2xl"} src={previewURL} />
            </Center>
          )}

          {/* <Input
          name="image"
          placeholder="Paste your image link"
          value={signupData.image}
          onChange={handleChange}
          focusBorderColor="none"
          border={"1px solid black !important"}
          type="text"
        /> */}
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={signupData.email}
            onChange={handleChange}
            focusBorderColor="none"
            border={"1px solid black !important"}
            type="email"
          />
          <FormLabel>Password</FormLabel>

          <Input
            name="password"
            value={signupData.password}
            onChange={handleChange}
            focusBorderColor="none"
            border={"1px solid black !important"}
            type="password"
          />

          <Button
            type="submit"
            width={"100%"}
            mt="6"
            colorScheme={"blue"}
            // onClick={handleSignup}
          >
            Signup
          </Button>
          <Text mt={2}>
            Already have an account? <Link to={"/login"}>Login</Link>
          </Text>
        </FormControl>
      </form>
    </VStack>
  );
}

export default Signup;
