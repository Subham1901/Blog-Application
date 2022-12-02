import { Avatar, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function UserItems(props) {
  return (
    <Link to={`${props.id}/places`} style={{ margin: 0 }}>
      <HStack
        w={"xs"}
        p={5}
        boxShadow={"dark-lg"}
        m={(0, "7 !important")}
        transition={"all 0.3s"}
        borderRadius="1rem"
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Avatar
          size="xl"
          name={props.name}
          src={`https://blog-app-backend-rest.herokuapp.com/${props.image}`}
        />

        <VStack display={"flex"} alignItems={"flex-start"}>
          <Heading color={"linkedin.800"}>
            {props.name.toString()[0].toUpperCase() +
              props.name.toString().slice(1)}
          </Heading>
          <Text color={"red"} fontWeight="semibold">
            {props.placeCount} {props.placeCount > 1 ? "Places" : "Place"}
          </Text>
        </VStack>
      </HStack>
    </Link>
  );
}

export default UserItems;
