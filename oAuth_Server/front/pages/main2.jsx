import React, { useCallback } from "react";
import { Box, Flex, transform } from "@chakra-ui/react";
import Main from "./Main";
import Anime from "./anime";
import Header from "../components/Header";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import test from "../image/a.png";
import test2 from "../image/b.png";
import test3 from "../image/c.png";
import test4 from "../image/d.png";

const main2 = () => {
  const [getscrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
    console.log(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Header />
      <Main />
      <Box
        background={"#160627"}
        h="calc(100vh)"
        borderTop="2px"
        borderColor="#160627"
      >
        <Flex justifyContent="space-around" mt={20}>
          <ItemsWrap rounded="md">
            <Image src={test} />
          </ItemsWrap>
          {/* <ItemsWrap2 rounded="md">
            <Image src={test2} />
          </ItemsWrap2>
          <ItemsWrap3 rounded="md">
            <Image src={test3} />
          </ItemsWrap3>
          <ItemsWrap4 rounded="md">
            <Image src={test4} />
          </ItemsWrap4> */}
        </Flex>
      </Box>
    </>
  );
};

export default main2;
const ItemsWrap = styled.div`
  width: 500px;
  height: 10px
  border-radius: 10px;
  overflow: hidden;
  margin: 0 3rem;
`;
