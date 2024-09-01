import { Box, IconButton, Input } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React from "react";
import { MdSearch, MdCancel } from "react-icons/md";

export default function SearchInput({ query, onChange, onClear }) {
  return (
    <Box flexDirection={"row"} alignItems={"center"}>
      <Input
        pl={"28px"}
        bg="white"
        borderColor={"transparent"}
        placeholder="Search name, number"
        fontSize={"18px"}
        h="48px"
        value={query}
        onChange={onChange}
      />
      <Box position={"absolute"} left="12px" zIndex={100}>
        <MdSearch size={20} />
      </Box>
      {isEmpty(query) ? null : (
        <Box position={"absolute"} right="12px" zIndex={100}>
          <IconButton aria-label="" onClick={onClear}>
            <MdCancel size={20} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
