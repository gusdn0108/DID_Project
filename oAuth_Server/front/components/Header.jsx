import React from "react";
import { Box, Flex, Button, Center } from "@chakra-ui/react";
import Link from "next/link";

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
              <h3>logo</h3>
            </Box>
            <Box w={450}>
              <Button>login</Button>
              <Button ml="3">sign up</Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Header;
