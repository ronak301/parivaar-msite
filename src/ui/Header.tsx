import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function Header({ title }) {
  return (
    <Box
      h={"64px"}
      w="100%"
      padding={"16px"}
      alignItems={"center"}
      justifyContent={"center"}
      bg="darkBackground"
      display={"flex"}>
      <Text color="white">{title}</Text>
    </Box>
  );
}
