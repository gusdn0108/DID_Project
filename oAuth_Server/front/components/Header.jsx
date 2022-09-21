import React from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import Image from 'next/image';
import logo from '../image/teamlogo.png';
import { useState, useEffect } from 'react';
import { deleteCookie } from 'cookies-next';
import { frontend } from '../utils/ip';

const Header = ({ user }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    }
  });

  return (
    <>
      <Flex>
        <Box>
          <Flex justifyContent="center" alignItems="center" px="2.5rem" pb="1rem" w="full" size="sm" fontSize="2xl" position="fixed" zIndex={10} mt="6">
            <Box w={3000}>
              <a href="/">
                <Image src={logo} width={250} height={100} />
              </a>
            </Box>
            {isLogin ? (
<<<<<<< HEAD
              <Box w={700}>
=======
              <Flex w={700}>
>>>>>>> f0a93e2c26d03c01a84bb6119df9ae4fae767d3e
                <Button
                  onClick={(req, res) => {
                    deleteCookie('user', { req, res, maxAge: 60 * 60 * 24 * 1000 });
                    setIsLogin(false);
                    window.location.replace('/');
                  }}
                >
                  Logout
                </Button>
<<<<<<< HEAD
                <a href={`http://${frontend}/mypage`}>
                  <Button ml="3">Profile</Button>
                </a>
                <a href={`http://${frontend}/manageApp`}>
                  <Button ml="3">MyApp</Button>
                </a>
              </Box>
            ) : (
              <Box w={450}>
                <a href={`http://${frontend}/localLogin`}>
                  <Button>Login</Button>
                </a>
                <a href={`http://${frontend}/register`}>
=======
                <a href={`${frontend}/mypage`}>
                  <Button ml="3">Profile</Button>
                </a>
                <a href={`${frontend}/manageApp`}>
                  <Button ml="3">MyApp</Button>
                </a>
              </Flex>
            ) : (
              <Box w={450}>
                <a href={`${frontend}/localLogin`}>
                  <Button>Login</Button>
                </a>
                <a href={`${frontend}/register`}>
>>>>>>> f0a93e2c26d03c01a84bb6119df9ae4fae767d3e
                  <Button ml="3">Sign up</Button>
                </a>
              </Box>
            )}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Header;
