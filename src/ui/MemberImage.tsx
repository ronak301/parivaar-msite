import { Box, Image, Text } from "@chakra-ui/react";
import { upperCase } from "lodash";
import React from "react";

export default function MemberImage({ src, initials }) {
  const w = "60px";
  const h = "60px";
  const br = "30px";
  if (src) return <Image src={src} width={w} height={h} borderRadius={br} />;

  return (
    <Box
      width={w}
      height={h}
      borderRadius={br}
      alignItems={"center"}
      borderColor={"green"}
      bg="lightGreen"
      borderWidth={2}
      justifyContent={"center"}>
      <Text>
        {upperCase(
          `${initials[0]?.charAt(0) || ""}${initials[1]?.charAt(0) || ""}`
        )}
      </Text>
    </Box>
  );
}
