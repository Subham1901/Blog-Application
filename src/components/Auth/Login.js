import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Divider,
  Button,
  Text,
  useToast,
  Center,
  Spinner,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const toast = useToast();
  const [login, setlogin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(authContext);
  const handleChange = async (event) => {
    await setlogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (!login.email || !login.password) {
      toast({
        description: "Email/Password is Required",
        status: "error",
        variant: "solid",
        position: "top",
        duration: 1000,
        isClosable: "true",
      });
      return;
    }
    await axios
      .post(
        "https://blog-app-backend-rest.herokuapp.com/blog/user/login",
        login
      )
      .then(
        (res) => {
          setLoading(false);
          toast({
            description: `Welcome! ${res.data.name}`,
            status: "info",
            variant: "solid",
            position: "top",
            duration: 2000,
            isClosable: "true",
          });
          auth.login(res.data.id, res.data.name, res.data.token);
          navigate("/");
        },
        (err) => {
          setLoading(false);
          toast({
            description: err.response.data.message,
            status: "error",
            variant: "solid",
            position: "top",
            duration: 1000,
            isClosable: "true",
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
    <VStack
      p={10}
      m="auto"
      alignItems={"center"}
      alignContent="center"
      width={["sm", "lg"]}
    >
      <Heading>Login Your Account</Heading>
      <Divider p={2} />
      <form onSubmit={handleLogin}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            width={[300, 400]}
            name="email"
            value={login.email}
            onChange={handleChange}
            focusBorderColor="none"
            border={"1px solid black !important"}
            type="email"
          />

          <FormLabel>Password</FormLabel>
          <Input
            width={[300, 400]}
            name="password"
            value={login.password}
            onChange={handleChange}
            focusBorderColor="none"
            border={"1px solid black !important"}
            type="password"
          />
          <Button type="submit" width={[300, 400]} mt="6" colorScheme={"blue"}>
            Login
          </Button>
          <Text mt={2}>
            New User? <Link to={"/signup"}>Signup</Link>
          </Text>
        </FormControl>
      </form>
    </VStack>
  );
}

export default Login;
