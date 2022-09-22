import { useEffect } from "react";
import { deleteCookie, setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Box, Flex, Text } from "@chakra-ui/react";

const Login = () => {
  const router = useRouter();
  const userInfo = getCookie("userInfo", { path: "/", domain: `localhost` });
  const setCookieAndMove = () => {
    if (location.href.split("?")[1] == undefined) {
      location.href = "/";
      return;
    }
    const cookie = location.href.split("?")[1].split("=")[1];
    if (userInfo !== undefined) {
      deleteCookie(userInfo);
    }

    setCookie("accessToken", cookie, {
      maxAge: 60 * 60 * 24 * 1000,
    });
    location.href = "/";
  };

  useEffect(() => {
    setCookieAndMove();
  }, []);

  return (
    <>
      <Flex justifyContent={"center"} mt="15%">
        <Box mx="auto" my="0">
          <Text textAlign={"center"}>
            로그인 중입니다. <br /> 잠시만 기다려주세요.
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
