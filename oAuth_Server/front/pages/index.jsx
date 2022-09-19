import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Animation from "./animetion";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";
import test from "../image/a.png";
import test2 from "../image/b.png";
import test3 from "../image/c.png";
import test4 from "../image/d.png";
import Textanime from "../components/Textanime";
import Textanime2 from "../components/Textanime2";
import Textanime3 from "../components/Textanime3";

const main = () => {
  const animationOption = {
    offscreen: { x: -100 },
    onscreen: { x: 1, rotate: [3, -3] },
    transition: {
      type: "spring",
      bounce: 1,
      duration: 4,
    },
  };

  return (
    <>
      <Animation />
      <Box background={"#160627"} borderTop="2px" borderColor="#160627">
        <Flex justifyContent="space-around">
          <motion.div
            initial={"offscreen"}
            whileInView={"onscreen"}
            transtition={animationOption}
          >
            <ItemsWrap>
              <a href="http://localhost:3000">
                <Image src={test} width={350} height={200} />
              </a>
            </ItemsWrap>
          </motion.div>

          <motion.div
            initial={"offscreen"}
            whileInView={"onscreen"}
            variants={animationOption}
          >
            <ItemsWrap>
              <a href="http://localhost:3001">
                <Image src={test2} width={340} height={200} />
              </a>
            </ItemsWrap>
          </motion.div>
          <motion.div
            initial={"offscreen"}
            whileInView={"onscreen"}
            variants={animationOption}
          >
            <ItemsWrap>
              <a href="http://localhost:3002">
                <Image src={test3} width={340} height={200} />
              </a>
            </ItemsWrap>
          </motion.div>
          <motion.div
            initial={"offscreen"}
            whileInView={"onscreen"}
            variants={animationOption}
          >
            <ItemsWrap>
              <a href="http://localhost:3003">
                <Image src={test4} width={340} height={200} />
              </a>
            </ItemsWrap>
          </motion.div>
        </Flex>
        <Box
          background={"#160627"}
          h="calc(70vh)"
          borderTop="2px"
          borderColor="#160627"
          mt="17%"
        >
          <Textanime text="DID 회원가입 하나로!" />
          <Textanime2 text="쇼핑몰 여행 밀키트 DAPP 사이트를" />
          <Textanime3 text='단 "한번의" 로그인으로 모두 이용하세요!' />
        </Box>
      </Box>
    </>
  );
};

export default main;

const ItemsWrap = styled.div`
  border-radius: 20px;
  overflow: hidden;
`;
