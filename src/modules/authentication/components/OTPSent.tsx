import { Box, Button, Input, Text } from "@chakra-ui/react";
import React from "react";
import { verifyOtp } from "../../../api/authApi";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../redux/authSlice";
import { getMemberDetails } from "../../../api/directoryApi";
import { useApi } from "../../../api/useApi";

export default function OTPSent({ phone }) {
  const [input, setInput] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { request: getMemberDetailsApi } = useApi(getMemberDetails);

  const onContinue = async () => {
    setLoading(true);
    try {
      const { data } = await verifyOtp(phone, input);
      const accessToken = data?.data?.jwt;
      const userId = data?.data?.userId;

      const { data: currentFullUser } = await getMemberDetailsApi(userId);
      const user = currentFullUser?.data;

      dispatch(setAccessToken(accessToken));
      dispatch(setUser(user));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const val = e?.target?.value;
    setInput(val);
  };

  return (
    <Box
      alignItems={"center"}
      h="calc(100vh)"
      padding={8}
      bg="bluishBackground">
      <Text
        color="primary"
        fontSize={"22px"}
        fontWeight={"500"}
        mb="24px"
        mt="24px">
        Parivaar App
      </Text>
      <Text fontSize={"22px"} fontWeight={"500"} mb="24px" mt="48px">
        {`Enter OTP sent to mobile ${phone}`}
      </Text>
      <Input
        bg="white"
        fontSize={"20px"}
        value={input}
        placeholder="Enter 6 digit OTP"
        onChange={handleChange}
        height={"64px"}
      />
      <Button
        onClick={onContinue}
        size="md"
        height="48px"
        width="100%"
        bg="primary"
        color={"white"}
        isLoading={isLoading}
        mt="24px">
        Login
      </Button>
    </Box>
  );
}
