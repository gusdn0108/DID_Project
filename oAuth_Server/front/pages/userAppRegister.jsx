import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tt,
  Td,
  Th,
  Tr,
  Img,
  Checkbox,
  Divider,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { backend, frontend } from "../utils/ip.js";

const userAppRegister = ({
  getUserInfo,
  appName,
  restAPI,
  redirectUri,
  hash,
  giveUserInfo,
}) => {
  // const setArray = (k) => {
  //   const newArray = isAgreed;
  //   newArray[k] = !newArray[k];
  //   setIsAgreed(isAgreed);
  //   console.log(isAgreed);
  // };

  const attributes = getUserInfo.map((v, k) => {
    return (
      <Box key={k}>
        <Flex>- {v.att}</Flex>
      </Box>
    );
  });

  const didRegister = async () => {
    const codeUrl = location.href;
    const email = codeUrl.split("?")[1].split("&")[0].split("=")[1];

    const response = await axios.post(`${backend}/oauth/app/userdidregister`, {
      restAPI,
      email,
      point: 50000,
      hash,
      giveUserInfo,
    });

    if (response.data.status == true) {
      alert(response.data.msg);
      location.href = `${frontend}/login?clientId=${restAPI}&redirectUri=${redirectUri}`;
    }
  };

  return (
    <>
      <Box
        border="1px"
        borderColor={"gray.200"}
        w="35%"
        mx="auto"
        my="10%"
        h="30rem"
        px="5%"
        py="6%"
      >
        <Flex h="10%" alignItems={"center"} pb="15%">
          <Img
            src="https://k.kakaocdn.net/14/dn/btqmdPkHR5M/DrrBuObYWlfrBaNkokh3J0/o.jpg"
            w="15%"
          />
          <Box w="20%" mx="5%" textAlign={"center"}>
            <Text fontSize={"90%"}>{appName}</Text>
            <Text fontSize={"75%"} color="gray.500" textAlign={"left"} px="5%">
              sila
            </Text>
          </Box>
          <Box w="80%">
            <Text textAlign={"left"} fontSize="4%" mt="2%">
              서비스 제공을 위해, 다음 사용자 정보 제공에 동의해주세요!
            </Text>
          </Box>
        </Flex>

        <Divider orientation="horizontal" mb="1.5%" />

        <Flex h="20%" fontWeight={"800"}>
          <Checkbox>약관 동의하기</Checkbox>
        </Flex>

        <Divider orientation="horizontal" mb="1.5%" />

        <Box py="2%">
          <Flex justifyContent={"space-around"} py="2%">
            <Text fontSize={"80%"}>
              약관 동의는 다음 정보들의 제공과 제공 목적에 대한 동의를 포함하고
              있습니다.
            </Text>
          </Flex>
          <Flex py="2%">
            <Box>{attributes}</Box>
          </Flex>
          <Flex>
            <Button onClick={didRegister}>동의하고 계속하기</Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  //oauthDB에 요청을 보내서 요청 유저 정보 데이터를 가져온다.
  const restAPI = ctx.query.restAPI;
  const email = ctx.query.email;
  const redirectUri = ctx.query.redirectUri;
  const hash = ctx.query.hash;
  const giveUserInfo = ctx.query.giveUserInfo;

  console.log(email);
  const response = await axios.get(
    `${backend}/oauth/app/giveUserInfo?restAPI=${restAPI}`
  );

  return {
    props: {
      getUserInfo: response.data.infos.filter(Boolean),
      appName: response.data.appName,
      restAPI,
      email,
      redirectUri,
      hash,
      giveUserInfo,
    },
  };
};

export default userAppRegister;
