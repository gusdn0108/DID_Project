import React from "react";
import { Box, Flex, Button, Center } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../image/teamlogo.png";

const Header = () => {
  return (
    <>
      <Flex>
        <Box>
          <Flex
            justifyContent="center"
            alignItems="center"
            px="2.5rem"
            pb="1rem"
            w="full"
            size="sm"
            fontSize="2xl"
            position="fixed"
            zIndex={10}
            mt="6"
          >
            <Box w={3000}>
              <a href="http://localhost:8080/main">
                <Image src={logo} width={250} height={100} />
              </a>
            </Box>
            <Box w={450}>
              <a href="http://localhost:8080/login">
                <Button>Login</Button>
              </a>
              <a href="http://localhost:8000/register">
                <Button ml="3">Sign up</Button>
              </a>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Header;
