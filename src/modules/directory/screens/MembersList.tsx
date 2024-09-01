import React, { useMemo } from "react";
import { useApi } from "../../../api/useApi";
import { getCommunityMembersForCommunityId } from "../../../api/directoryApi";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { isEmpty, map } from "lodash";
import Header from "../../../ui/Header";
import MemberImage from "../../../ui/MemberImage";
import { getBusinessTypeDisplay } from "../../../utils/utils";
import SearchInput from "../../../ui/SearchInput";
import { useDebounce } from "use-debounce";

export default function MembersList() {
  const filters = useMemo(() => ({ isAccountManager: true }), []);

  const {
    data: membersData,
    loading,
    request: fetchCommunityMembersForCommunityId,
  } = useApi(getCommunityMembersForCommunityId);

  const [query, setQuery] = React.useState("");

  const [debouncedText] = useDebounce(query?.replace(/\s/g, "").trim(), 300);

  React.useEffect(() => {
    if (!loading) fetchCommunityMembersForCommunityId(8, 0, 50, "", filters);
  }, []);

  const onChange = (e) => {
    const val = e?.target?.value;
    setQuery(val);
  };

  const onClear = () => {
    setQuery("");
    fetchCommunityMembersForCommunityId(8, 0, 50, "", filters);
  };

  React.useEffect(() => {
    if (!isEmpty(debouncedText))
      fetchCommunityMembersForCommunityId(8, 0, 50, debouncedText, {});
  }, [debouncedText]);

  return (
    <Box bg="bluishBackground" px={"8px"}>
      <Header title="Terapanth Sabha Udaipur" />
      <Box mt={"72px"}>
        <SearchInput query={query} onChange={onChange} onClear={onClear} />
        <Text
          mt="8px"
          ml="4px">{`${membersData?.members?.count} Results`}</Text>
        {loading ? (
          <Box
            bg="white"
            alignItems={"center"}
            justifyContent={"center"}
            pt="64px">
            <Spinner />
          </Box>
        ) : (
          map(membersData?.members?.rows, (member: any) => {
            const occupation =
              member?.business?.name ||
              getBusinessTypeDisplay(member?.business?.type) ||
              member?.education;

            return (
              <Box
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
                    <Text
                      fontSize={"14px"}
                      fontWeight={"500"}
                      color={"gray.500"}>
                      {member?.phone}
                    </Text>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"400"}
                      color={"gray.500"}
                      mt={-1}>
                      {occupation}
                    </Text>
                  </Box>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
}
