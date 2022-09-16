import { Image, Box, Badge, Button, Text, Drawer, Center, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UpdatePw from '../components/UpdatePw.jsx';

const MypageDrawer = ({ MypageIsOpen, MypageOnClose, user, did }) => {
  let email;
  let username;

  if (user !== undefined) {
    email = user.email;
    username = user.name;
  } else if (did !== undefined) {
    email = did.stringCookie.email;
    username = did.stringCookie.name;
  }

  const [point, setPoint] = useState(0);

  useEffect(() => {
    (async function () {
      const response = await axios.post('http://localhost:4000/api/auth/pointInquiry', { email });
      if (response.data.status) {
        setPoint(response.data.point);
      }
    })();
  }, []);

  return (
    <Drawer isOpen={MypageIsOpen} placement="right" onClose={MypageOnClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size="lg" />
        <DrawerHeader borderBottom="0.5px solid #000">
          <Text fontSize="2rem" mt="1rem" textAlign="center">
            WELCOME {username} 🥳
          </Text>
        </DrawerHeader>

        <DrawerBody mt="1rem">
          <Center>
            <Text fontWeight="bold"> ID : {email}</Text>
          </Center>
          <Center>
            {user ? (
              <Text fontWeight="bold" mt="0.2rem">
                {' '}
                POINT : {point} 포인트
              </Text>
            ) : null}
          </Center>
          <Center>{user ? <UpdatePw user={user} /> : null}</Center>
          <Center mt="1rem">
            <Text fontSize="2rem" fontWeight="bold">
              TODAY BEST
            </Text>
          </Center>

          <Center>
            <Box w="15rem" mt="1rem">
              <Image src="https://img.hazzys.com/cmsstatic/product/HSDR2CC72BK_1/asset/HSDR2CC72BK_00.jpg?category" width={300} height={300} />
              <Box p="6">
                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    New
                  </Badge>{' '}
                  블랙 레이온 혼방 핏앤플레어 져지 원피스
                </Box>

                <Box>20400 P</Box>
                <Box mt="2" alignItems="center">
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <StarIcon key={i} color={i < 5 ? 'teal.500' : 'gray.300'} />
                    ))}
                  <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    1,042 reviews
                  </Box>
                </Box>
              </Box>
            </Box>
          </Center>
        </DrawerBody>

        <DrawerFooter>
          <Button colorScheme="teal" variant="outline" mr={3} onClick={MypageOnClose}>
            닫기
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MypageDrawer;
