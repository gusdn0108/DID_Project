import useRouter from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Divider, Stack, Flex, Box, Image, Text, Center } from '@chakra-ui/react';
import axios from 'axios';

const BuyItem = ({ user }) => {
  const router = useRouter;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [formattedPrice, setFormattedPrice] = useState(0);
  const [point, setPoint] = useState(0);

  const [hashId, setHashId] = useState('');
  const [did, setDid] = useState(true);
  const [token, setToken] = useState(false);

  const buyItem = async () => {
    const response = await axios.post('http://localhost:4000/api/auth/usePoint', { email, price: formattedPrice });
    if (response.data.status) {
      getPoint();
      alert('구매 완료되었습니다');
    } else {
      alert('구매에 실패하였습니다.');
    }
  };

  const getPoint = async () => {
    const response = await axios.post('http://localhost:4000/api/auth/pointInquiry', { email: user.email });
    if (response.data.status) {
      setPoint(response.data.point);
    }
  };

  // OAuth의 페이지 요청하는 함수
  const getPage = () => {
    let child;

    window.name = 'OAuth Module';

    child = window.open('http://localhost:8080/payment', 'test', 'width=800, height=600');
  };

  // OAuth 페이지에 hashID 보내는 함수
  const toPage = () => {
    console.log(child.document);
  };

  // OAuth에 포인트를 차감 요청할 함수
  const didBuyItem = async () => {
    const response = await axios.post('http://localhost:4000/api/buyItem/buyItem', {
      hashId,
      token,
    });

    if (response.data.status) {
      alert('구매 완료되었습니다');
    } else {
      alert('구매에 실패하였습니다.');
    }
  };

  useEffect(() => {
    setImageUrl(router.query.imageUrl);
    setTitle(router.query.title);
    setFormattedPrice(router.query.formattedPrice);

    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setHashId(user.hashId);

      getPoint();
    }
  });

  return (
    <Box m="10">
      <Flex>
        <Image flex={1} src={imageUrl} height={700} />
        <Stack flex={1} ml="5" direction="row" p={4}>
          <Divider orientation="vertical" />
          <Flex direction="column">
            <Flex>
              <Box w="40rem" flex={2} pl="0.5rem" pt="1.5rem" borderBottom="1px solid rgba(0, 0, 0, 0.1);">
                <Text fontSize="1.5rem">{title}</Text>
              </Box>
            </Flex>
            <Box w="4 0rem" flex={2} pl="0.5rem" pt="1rem" borderBottom="1px solid rgba(0, 0, 0, 0.1);">
              <Center borderBottom="1px solid rgba(0, 0, 0, 0.1);">
                <Text fontSize="1.8rem" fontWeight="bold" pt="5rem" pl="24rem" pb="0.5rem">
                  판매가 : {formattedPrice} P
                </Text>
              </Center>
              <Center pt="0.5rem">
                <Text fontSize="1.5rem" fontWeight="bold" pb="1rem">
                  Kyungli Mall 포인트 사용
                </Text>
              </Center>
              <Text fontSize="1.5rem" fontWeight="bold" pl={user ? '19rem' : '24rem'} pt="5rem">
                {user ? `${username}님 보유 포인트 : ${point} P` : '로그인 후 이용가능 합니다'}
              </Text>
              <Button w="15rem" colorScheme="teal" variant="outline" ml="24rem" mt="0.5rem" mb="1rem" onClick={buyItem} disabled={formattedPrice <= point ? false : true}>
                구매
              </Button>
              {user ? (
                formattedPrice >= point ? (
                  <Center mb="0.5rem">
                    <Text color="red" fontSize="1rem">
                      보유 포인트가 부족합니다.
                    </Text>
                  </Center>
                ) : null
              ) : null}
            </Box>
            <Box w="40rem" flex={2} pl="0.5rem" pt="1rem" borderBottom="1px solid rgba(0, 0, 0, 0.1);">
              {did ? (
                <>
                  <Text textAlign="center" fontSize="1.5rem" fontWeight="bold">
                    다른 사이트 포인트 사용
                  </Text>
                  {token ? (
                    /** 총 사용할 포인트가 아닌 포인트를 사용하는 사이트별로 보여줘야할까? 귀찮 */
                    <>
                      <Text textAlign="right" fontSize="1.5rem" fontWeight="bold" pt="6rem" pr="0.5rem">
                        {user ? `사용할 총 포인트 ${point}  ` : '로그인 후 이용가능 합니다'}
                      </Text>
                      <Button w="15rem" colorScheme="teal" variant="outline" ml="24rem" onClick={didBuyItem} mb="1rem">
                        구매
                      </Button>
                    </>
                  ) : (
                    <>
                      <Text textAlign="right" fontSize="1.5rem" fontWeight="bold" pt="6rem" pr="0.5rem">
                        {user ? `${username}님 포인트 조회하기 ` : '로그인 후 이용가능 합니다'}
                      </Text>
                      <Button w="15rem" colorScheme="teal" variant="outline" ml="24rem" onClick={getPage} mb="1rem" disabled={user ? false : true}>
                        조회
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <Center>
                  <Text fontSize="1.5rem" fontWeight="bold" pl="20rem" pt="11rem" pb="1rem">
                    DID 등록 후 이용가능 합니다
                  </Text>
                </Center>
              )}
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default BuyItem;
