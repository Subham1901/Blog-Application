import { Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { TbFaceIdError } from "react-icons/tb";
function ErrorPage() {
  return (
    <VStack width={"100%"} margin="auto" p="10">
      <Heading> You are not Authorized, Please Login </Heading>
      <>
        <TbFaceIdError size={100} />
      </>
    </VStack>
  );
}

export default ErrorPage;
