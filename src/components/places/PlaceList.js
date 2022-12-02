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
import React, { useContext, useEffect, useState } from "react";
import PlaceItems from "./PlaceItems";
import { Link, useParams } from "react-router-dom";
import { authContext } from "../Auth/AuthContext";
import axios from "axios";

function PlaceList() {
  const { uid } = useParams();
  const auth = useContext(authContext);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPlaceofUser = async () => {
    setLoading(true);
    await axios
      .get(`https://blog-app-backend-rest.herokuapp.com/blog/place/${uid}`)
      .then((success) => {
        setPlaces(success.data.user.places);
        setLoading(false);
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
        {auth.userId == uid ? (
          <Box
            display={"flex"}
            justifyContent="center"
            flexDirection={"column"}
          >
            <Heading textAlign={"center"} mt="10" color="red">
              No places found, do you want to add?
            </Heading>
            <Button colorScheme={"yellow"} mt={5}>
              <Link to={"/places/new"}>Add Place</Link>
            </Button>
          </Box>
        ) : (
          <>
            <Box
              display={"flex"}
              w="sm"
              justifyContent="center"
              flexDirection={"column"}
            >
              <Heading textAlign={"center"} color="red" mt="10">
                No places found!!
              </Heading>
            </Box>
          </>
        )}
      </VStack>
    );
  }

  return (
    <Container maxW={"container.xl"} overflow="auto">
      <HStack
        wrap={["nowrap", "wrap"]}
        justifyContent="center"
        display={"flex"}
        flexDirection={["column", "column", "column", "row"]}
      >
        {places.map((place) => (
          <PlaceItems
            uid={uid}
            key={place._id}
            id={place._id}
            title={place.title}
            description={place.description}
            imageUrl={place.image}
            address={place.address}
            coordinates={place.coordinates}
            creator={place.creator}
          />
        ))}
      </HStack>
    </Container>
  );
}

export default PlaceList;
