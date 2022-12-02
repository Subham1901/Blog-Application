import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../Auth/AuthContext";
import PlaceItems from "./PlaceItems";

function UserPlaces() {
  const auth = useContext(authContext);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPlaceofUser = async () => {
    setLoading(true);
    await axios
      .get(
        `https://blog-app-backend-rest.herokuapp.com/blog/place/${auth.userId}`
      )
      .then((success) => {
        setPlaces(success.data.user.places);
        if (success.status == 200) {
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    getPlaceofUser();
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
  if (places.length == 0) {
    return (
      <VStack width={"100%"}>
        <Box display={"flex"} justifyContent="center" flexDirection={"column"}>
          <Heading textAlign={"center"} mt="10" color="red">
            No places found, do you want to add?
          </Heading>
          <Button colorScheme={"yellow"} mt={5}>
            <Link to={"/places/new"}>Add Place</Link>
          </Button>
        </Box>
      </VStack>
    );
  }

  return (
    <Container maxW={"container.xl"}>
      <HStack
        wrap={["nowrap", "wrap"]}
        justifyContent="center"
        display={"flex"}
        flexDirection={["column", "column", "column", "row"]}
      >
        {places.map((place) => (
          <PlaceItems
            key={place._id}
            id={place._id}
            title={place.title}
            description={place.description}
            imageUrl={place.image}
            address={place.address}
            coordinates={place.coordinates}
            uid={place.creator}
          />
        ))}
      </HStack>
    </Container>
  );
}

export default UserPlaces;
