import {
  Center,
  Container,
  Heading,
  HStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserItems from "./UserItems";

function UserList() {
  const toast = useToast();
  const [userList, setuserList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    setLoading(true);
    await axios
      .get("https://blog-app-backend-rest.herokuapp.com/blog/user")
      .then(
        (res) => {
          setLoading(false);
          setuserList(res.data.users);
        },
        (err) => {
          toast({
            description: err.response.data.message,
            status: "warning",
            duration: 1000,
            position: "top",
          });
        }
      );
  };

  useEffect(() => {
    getAllUsers();
  }, []);
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
  if (userList.length == 0) {
    return <Heading textAlign={"center"}>No user found!!</Heading>;
  }
  return (
    <Container maxW={"container.xl"} overflow={"auto"}>
      <HStack
        wrap={["nowrap", "wrap"]}
        display="flex"
        flexDirection={["column", "column", "row"]}
        justifyContent={["center", "center"]}
      >
        {userList.map((user) => (
          <UserItems
            key={user._id}
            id={user._id}
            name={user.name}
            image={user.image}
            placeCount={user.places.length}
          />
        ))}
      </HStack>
    </Container>
  );
}

export default UserList;
