import React from "react";
import { useApi } from "../../../api/useApi.tsx";
import { getCommunityMembersForCommunityId } from "../../../api/directoryApi.ts";
import { Box, Card, CardBody, List, Text } from "@chakra-ui/react";
import { map } from "lodash";
import Header from "src/ui/Header";
import MemberImage from "src/ui/MemberImage.tsx";
import { getBusinessTypeDisplay } from "src/utils/utils.ts";

export default function MembersList() {
  const filters = { isAccountManager: true };

  const {
    data: membersData,
    loading,
    error,
    request: fetchCommunityMembersForCommunityId,
  } = useApi(getCommunityMembersForCommunityId);

  React.useEffect(() => {
    if (!loading) fetchCommunityMembersForCommunityId(8, 0, 15, "", filters);
  }, []);

  console.log("membersData", membersData);

  if (loading) return null;

  return (
    <Box bg="bluishBackground">
      <Header title="Terapanth Sabha Udaipur" />

      {map(membersData?.members?.rows, (member) => {
        const occupation =
          member?.business?.name ||
          getBusinessTypeDisplay(member?.business?.type) ||
          member?.education;

        return (
          <Box
            mx={"8px"}
            my={"4px"}
            bg="white"
            padding={"16px"}
            border="1px"
            rounded="lg"
            borderColor="gray.200">
            <Box flexDirection={"row"} alignItems={"center"}>
              <MemberImage
                src={member?.profilePicture}
                initials={[member?.firstName, member?.lastName]}
              />
              <Box ml="16px">
                <Box flexDirection={"row"}>
                  <Text fontSize={"20px"} fontWeight={"500"}>
                    {member?.firstName}
                  </Text>
                  <Text fontSize={"20px"} fontWeight={"500"} ml="8px">
                    {member?.lastName}
                  </Text>
                </Box>
                <Text fontSize={"14px"} fontWeight={"500"} color={"gray.500"}>
                  {member?.phone}
                </Text>
                <Text
                  fontSize={"14px"}
                  fontWeight={"400"}
                  color={"gray.400"}
                  mt={-1}>
                  {occupation}
                </Text>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
