import { Box, Button, Flex, Text, Input, Image } from "@chakra-ui/react";

import { useState } from "react";
import axios from "axios";
import { backend } from "../utils/ip.js";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Purchase = ({ userId, email, point, setPoint }) => {
  const router = useRouter();
  const productInfo = router.asPath;

  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [exp, setExp] = useState("");

  const setProductInfo = () => {
    const productInfo = location.href.split("?")[1].split("&");
    setPrice(productInfo[0].split("=")[1].toLocaleString());
    setTitle(decodeURI(productInfo[1].split("=")[1]));
    setImg(productInfo[2].split("=")[1]);
  };

  const purchase = async (price) => {
    if (!email) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    const returnValue = confirm(
      `선택하신 상품 가격은 ${price}원입니다. 구매하시겠습니까? \n 남은 포인트: ${point}원`
    );
    if (returnValue == true) {
      try {
        const response = await axios.post(`${backend}/api/auth/usePoint`, {
          email,
          price,
        });
        if (response.data.status == true) {
          alert(response.data.msg);
          setPoint(point - price);
        } else {
          alert("잔액이 부족합니다");
        }
      } catch (e) {
        alert(e.message);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    setProductInfo();
  }, []);

  return (
    <>
      <Box w="65%" h="40rem" mx="auto" my="0" px="5%" py="5%">
        <Box
          w="55%"
          border="1px"
          borderColor={"gray.200"}
          h="100%"
          mx="auto"
          my="0"
          p="5%"
          textAlign={"center"}
          boxShadow="xs"
        >
          <Image src={img} mx="auto" my="0" w="100%" mb="3%" />

          <Box fontSize={"150%"} mb="3%">
            {title}
          </Box>
          <Box mb="4%" fontSize={"120%"}>
            {price} KRW
          </Box>
          <Box>
            <Flex justifyContent={"center"}>
              <Button colorScheme={"blue"} variant="outline" mx="2%" w="30%">
                구매하기
              </Button>
              <Button colorScheme={"blue"} variant="outline" mx="2%" w="30%">
                취소
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Purchase;
