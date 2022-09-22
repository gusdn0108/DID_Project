import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useLatestRef,
} from "@chakra-ui/react";
import axios from "axios";
import { backend, frontend } from "../utils/ip";
import { getCookie } from "cookies-next";

const mypage = ({ userId, email, point }) => {
  const [pw, setPw] = useState(undefined);

  const accessToken = getCookie("accessToken");

  const changePw = () => {
    location.href = `${frontend}/changePw`;
  };

  return (
    <Box pt="6rem">
      <>
        <Box w="30%" mx="auto" my="0" fontSize={"125%"} justifyContent="center">
          <Box fontSize={"100%"} px="10%" mb="5%">
            <Text mb="2%" px="5%">
              {email}님, 안녕하세요.
            </Text>
            <Text mb="2%" px="5%">
              {" "}
              point : {point}
            </Text>
          </Box>
          {accessToken ? (
            ""
          ) : (
            <Flex justifyContent={"center"}>
              <Button mx="1%" w="25%" onClick={changePw}>
                비밀번호 변경
              </Button>
            </Flex>
          )}
        </Box>
      </>
    </Box>
  );
};

export default mypage;
