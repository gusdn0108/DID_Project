import { Box, Button, Flex, Text, Input, Image, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { request } from '../utils/axios';
import { useState } from 'react';
import { frontend } from '../utils/ip';

export default function Home() {
  const [DIDid, setDIDid] = useState(undefined);
  const [DIdPw, setDidPw] = useState(undefined);

  const getId = (e) => {
    setDIDid(e.target.value);
  };

  const getPw = (e) => {
    setDidPw(e.target.value);
  };

  const didLoginHandler = async () => {
    const codeUrl = location.href;
    const reURL = codeUrl.split('redirectUri=')[1].split('&')[0];
    const restAPI = codeUrl.split('clientId=')[1].split('&')[0];
    const giveUserInfo = codeUrl.split('giveUserInfo=')[1];
    const response = await request.post(`/oauth/login/authorize`, {
      email: DIDid,
      password: DIdPw,
      reURL,
      restAPI,
      giveUserInfo,
    });

    if (response.data.status == 'first') {
      location.href = response.data.registerUri;

      return;
    }
    if (response.data.redirectUri == undefined) {
      alert(response.data.msg);
      return;
    }

    location.href = response.data.redirectUri;
  };

  return (
    <>
      <Box w="100%" h="65rem" background={'#160627'}>
        <Flex w="60%" mx="auto" pt="12%" justifyContent={'center'}>
          <Box w="50%" mx="3%" px="5%" py="6%" color="white" border={'1px'} borderColor="gray.200" borderRadius={'5px'}>
            <Text fontSize={'1.5rem'} mb="8%">
              한 번의 로그인으로 다양한 사이트를 이용해보세요!
            </Text>
            <Text fontSize="0.75rem" mb="0.5%">
              다양한 사이트를 하나의 아이디로 이용할 수 있습니다
            </Text>
            <Text fontSize="0.75rem" mb="12%">
              사용 중인 DID계정으로 로그인해 보세요
            </Text>
            <Image src="https://accounts.kakao.com/assets/weblogin/techin/retina/banner_login2-7800b65948f0912306346a56a61832a98aa302c7e6cf3411eacd35db47d53a3c.png"></Image>
          </Box>

          <Box w="35%" mx="3%" border={'1px'} borderColor="gray.200" px="5%" py="5%" color="white" borderRadius={'5px'}>
            <Text fontSize={'2rem'} mb="1rem">
              DID Service
            </Text>
            <FormControl mb="1rem">
              <FormLabel fontSize="xl" mb="2.5">
                Email
              </FormLabel>
              <Input type="text" placeholder="email을 입력해주세요" size="md" id="Email" mb="7%" onChange={getId} />

              <FormLabel fontSize="xl" mb="2.5">
                Password
              </FormLabel>
              <Input type="password" placeholder="password을 입력해주세요" size="md" id="userPw" mb="5%" onChange={getPw} />
            </FormControl>
            <Button onClick={didLoginHandler} w="100%" mb="7%" color="#160627" border="1px #fff solid">
              로그인
            </Button>
            <Button
              onClick={() => {
                location.href = `${frontend}/register`;
              }}
              bg="#160627"
              border="1px #fff solid"
              w="100%"
              color="#fff"
              _hover={{ bg: '#160627' }}
            >
              회원가입
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
