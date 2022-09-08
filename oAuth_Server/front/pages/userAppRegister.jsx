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
import { useState } from "react";
import { backend, frontend } from "../utils/ip.js";

const userAppRegister = ({ getUserInfo, appName }) => {
  const attributes = getUserInfo.map((v, k) => {
    return (
      <Box key={k}>
        <Flex>
          <Checkbox>{v.att}</Checkbox>
        </Flex>
      </Box>
    );
  });

  const didRegister = async () => {
    // 모든 체크 박스에 체크가 되어있다면 < 이 부분 처리를 못하겠음
    const response = await axios.post(`${backend}/oauth/app/userdidregister`, {
      restAPI: "1a991c978f941a31733d4159a7a912b",
      email: "619049@naver.com",
      // 상수는 나중에 변수화 할 것
      point: 50000,
      // 포인트는 처음 가입할 때 front에서 넣을지 backend에서 넣을지 고민해볼것
    });
    console.log(response.data);
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
          <Box w="20%" bg="red.200" mx="5%" textAlign={"center"}>
            <Text fontSize={"90%"}>{appName}</Text>
            <Text fontSize={"75%"} color="gray.500" textAlign={"left"} px="5%">
              sila
            </Text>
          </Box>
          <Box bg="blue.200" w="80%">
            <Text textAlign={"center"} fontSize="4%">
              서비스 제공을 위해, 다음 사용자 정보 제공에 동의해주세요!
            </Text>
          </Box>
        </Flex>

        <Divider orientation="horizontal" mb="2%" />

        <Flex h="20%" fontWeight={"800"}>
          <Checkbox>약관 전체동의하기</Checkbox>
        </Flex>

        <Divider orientation="horizontal" mb="1%" />

        <Box py="2%">
          <Flex justifyContent={"space-around"} py="2%">
            <Text fontSize={"80%"}>
              전체 동의는 oauth 및 {appName}에 대한 정보 제공의 동의, 제공
              목적에 대한 동의를 포함하고 있습니다.
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
  // oauthDB에 요청을 보내서 요청 유저 정보 데이터를 가져온다.
  // console.log(ctx.req);
  const restAPI = "1a991c978f941a31733d4159a7a912b";
  const response = await axios.get(
    `${backend}/oauth/app/giveUserInfo?restAPI=${restAPI}`
  );

  return {
    props: {
      getUserInfo: response.data.infos.filter(Boolean),
      appName: response.data.appName,
    },
  };
};

export default userAppRegister;
