import { Box, Center, Text, Button, Flex, Checkbox, Divider, NumberInput, NumberInputField } from '@chakra-ui/react';
import { request } from '../utils/request.js';
import { useState, useEffect } from 'react';
import { setCookie } from 'cookies-next';
import { request } from '../utils/axios';

const payment = () => {
  const [payMenu, setPayMenu] = useState([]);
  const [payPoint, setPayPoint] = useState({});
  const [usePoint, setUsePoint] = useState([]);

  const [point, setPoint] = useState(0);

  const usedPay = (v, i) => {
    setPayPoint({ ...payPoint, [i]: v });
  };

  const showList = () => {
    return payMenu.map((v, k) => {
      return (
        <Flex w="100%" mt="1.5rem" border="1px solid #fff" key={k} borderRadius="10px">
          <Center w="15%" h="3rem" fontSize={'125%'}>
            {v.appName}
          </Center>
          <Center w="77%" h="3rem" borderLeft="1px solid #fff">
            <Text w="45%" h="3rem" fontSize="0.8rem" borderRight="1px solid #fff" textAlign={'center'} lineHeight="3rem">
              보유 Point : {v.point}
            </Text>
            <Text pl="1rem" fontSize="0.8rem">
              사용 Point
            </Text>
            <NumberInput w="30%" min={0} max={v.point} ml="1rem" onChange={(valueAsNumber) => usedPay(valueAsNumber, v.id)}>
              <NumberInputField />
            </NumberInput>
          </Center>
          <Checkbox w="13%" pl="1%" colorScheme="green" onChange={() => checkedBox(v.id)}>
            사용
          </Checkbox>
        </Flex>
      );
    });
  };

  const totalPayPrice = () => {
    let usedPoint = 0;
    usePoint.map((v) => {
      if (payPoint[v] !== undefined) usedPoint += Number(payPoint[v]);
    });
    return usedPoint;
  };

  const checkedBox = (i) => {
    if (usePoint.includes(i)) {
      let arr = usePoint.filter((e) => e !== i);
      setUsePoint(arr);
    } else {
      setUsePoint([...usePoint, i]);
    }
  };

  const getPoint = async () => {
    const email = window.location.search.split('&')[0].split('=')[1];
    const response = await request.post(`/Oauth/point/checkPoint`, { email });
    if (!response.data.isError) {
      setPayMenu(response.data.value);
    } else {
      alert('포인트 정보를 불러오는데 실패하였습니다 다시 시도하여 주십시오.');
    }
  };

  const Pay = async (req, res) => {
    const response = await request.post(`/Oauth/point/sendToken`, { pointInfo: payPoint });
    document.domain = `localhost`;
    setCookie('item', response.data.value, {
      req,
      res,
      maxAge: 60 * 60 * 24 * 1000,
    });
    opener.location.reload();
    window.self.close();
  };

  useEffect(() => {
    setPoint(window.location.search.split('&')[1].split('=')[1]);
    getPoint();
  }, []);

  return (
    <Box h="50rem" p="7%" bg="#160627">
      <Box w="70%" m="0 auto">
        <Center>
          <Text fontSize="2rem" fontWeight="semibold" color="white">
            OAuth 결제 모듈
          </Text>
        </Center>
        <Text className="pointText" fontSize="1.5rem" fontWeight="semibold" textAlign="center" mt="1rem" color="white">
          결제할 포인트 : {point} P
        </Text>
        <Divider mt="1rem" />
        <Center w="100%" h="20%" mt="1rem">
          <Flex direction="column" w="100%" color="white">
            {showList()}
            <Divider mt="2rem" />
          </Flex>
        </Center>
        <Center mt="1rem" color="white">
          <Text fontSize="1.5rem">구매하기</Text>
        </Center>
        <Center w="100%" h="7rem">
          <Flex direction="column">
            <Center w="100%">
              <Text fontSize="1.2rem" color="white">
                입력 Point : {totalPayPrice()}
              </Text>
              <Button ml="2rem" onClick={Pay} disabled={totalPayPrice() === Number(point) ? false : true} bg="white">
                적용하기
              </Button>
            </Center>
            <Center w="100%">
              <Text mt="0.2rem" color={totalPayPrice() === Number(point) ? null : 'red'}>
                {totalPayPrice() === 0 ? null : totalPayPrice() === Number(point) ? null : '상품의 가격과 사용할 포인트를 맞춰 주십시오.'}
              </Text>
            </Center>
          </Flex>
        </Center>
      </Box>
    </Box>
  );
};

export default payment;
