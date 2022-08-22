import { Avatar, AvatarBadge, AvatarGroup, Button, Flex, Box, Center, Text, useDisclosure, Wrap, WrapItem, Container, Spacer } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import Carousel from '../components/styles/Carousel.jsx';
import MainTemplate from '../components/styles/Mainstyle';
import ItemCarousel from '../components/styles/ItemCarousel';

const Home = () => {
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    setSlide(true);
  }, []);

  return (
    <Box pt={10}>
      {slide ? <Carousel /> : null}
      <MainTemplate>
        <Wrap className="menuIcon">
          <Center className="menuFlex">
            <Avatar size="lg" src="13.jpeg" color="blue" background="#fff" border="0.01rem solid #24d024">
              <Text pl={5} fontSize={14} fontWeight="bold">
                한식
              </Text>
            </Avatar>
            <Avatar size="lg" src="14.jpeg" color="blue" background="#fff" border="0.01rem solid #24d024">
              <Text pl={5} fontSize={14} fontWeight="bold">
                양식
              </Text>
            </Avatar>
            <Avatar size="lg" src="15.jpeg" color="blue" background="#fff" border="0.01rem solid #24d024">
              <Text pl={5} fontSize={14} fontWeight="bold">
                일식
              </Text>
            </Avatar>
            <Avatar size="lg" src="16.jpeg" color="blue" background="#fff" border="0.01rem solid #24d024">
              <Text pl={5} fontSize={14} fontWeight="bold">
                중식
              </Text>
            </Avatar>
            <Avatar size="lg" src="17.jpeg" color="blue" background="#fff" border="0.01rem solid #24d024">
              <Text pl={5} fontSize={14} fontWeight="bold">
                동남아
              </Text>
            </Avatar>
            <Avatar size="lg" src="18.jpeg" color="blue" background="#fff" border="0.01rem solid #24d024">
              <Text pl={5} fontSize={14} fontWeight="bold">
                샐러드
              </Text>
            </Avatar>
            <Avatar size="lg" src="19.jpeg" color="blue" background="#fff" border="0.01rem solid #24d024">
              <Text textAlign="center" pl={5} fontSize={14} fontWeight="bold">
                프리미엄
              </Text>
            </Avatar>
          </Center>
        </Wrap>
        <Center pt="10rem">
          <Text fontSize="5rem" fontWeight="bold">
            B E S T
          </Text>
        </Center>
        {slide ? <ItemCarousel /> : null}
      </MainTemplate>
    </Box>
  );
};

export default Home;
