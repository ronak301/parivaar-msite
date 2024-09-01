import { Box, Button, Input, Text, useToast } from "@chakra-ui/react";
import React from "react";
import OTPSent from "../components/OTPSent";
import { sendOtp } from "../../../api/authApi";
import { sendEvent } from "../../../api/events";

export default function LoginScreen() {
  const [otpSent, setOtpSent] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const val = e?.target?.value;
    setPhone(val);
  };

  const onContinue = async () => {
    if (!phone && !(phone?.length === 10)) {
      return;
    }

    const { data } = await sendOtp(phone);

    if (data?.success) {
      setOtpSent(true);
      setLoading(false);
    } else {
      setOtpSent(false);
      setLoading(false);

      if (data?.error === "Number does not exist, Signups are disabled") {
        sendEvent(`Number Entered doesnt belong to any community. - ${phone}`);
        toast({
          title: "Sorry! Number Entered doesnt belong to any community.",
          description:
            "You are currently not member of any community. Please contact app owner.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        sendEvent(
          `Something went wrong while sending OTP, so cant send at the moment for phone number - ${phone}`
        );
        toast({
          title: "Something went wrong",
          description: "Cannot send otp at the moment. Please try again later.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  if (otpSent) {
    return <OTPSent phone={phone} />;
  }

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
        Login
      </Text>
      <Input
        bg="white"
        fontSize={"20px"}
        value={phone}
        placeholder="Enter 10 digit mobile number"
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
        Continue
      </Button>
    </Box>
  );
}
