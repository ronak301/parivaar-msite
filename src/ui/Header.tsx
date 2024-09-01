import { Box, Text } from "@chakra-ui/react";
import React from "react";

export default function Header({ title }) {
  return (
    <Box
      position={"absolute"}
      left={0}
      right={0}
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
