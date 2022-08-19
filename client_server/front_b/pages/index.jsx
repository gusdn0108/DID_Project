import { Box, Button, Flex, Text, Input, Link, FormControl,
  FormLabel, FormErrorMessage, FormHelperText,} from "@chakra-ui/react";
import {useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import cookie from 'cookie'

const Home = ({userId, email, mobile}) => {
  
  return (
    <Box >
      <Flex justifyContent='space-around' px='3.5rem' border='1px' borderColor='gray.200' >
        <Box border='1px' borderColor='red.200' px='2rem' py='4rem' bg='red.200' w='30%'>
          <Box>고객님,</Box>
          <Box>어떤 여행을 꿈꾸시나요?</Box>

          <Flex justifyContent='center'>
            <Text>패키지</Text>
            <Text>항공</Text>
            <Text>호텔</Text>
          </Flex>

          <Box>
            <Input type='text' w = '20rem' borderRadius='0.25rem' pd='1.5rem' bg='white' />
            <Box>
              <Button>인천/김포 출발</Button>
              <Button>여행시작일 선택</Button>
            </Box>
            <Box>
              <Button>항공권은 있어요</Button>
              <Button>우리끼리만 여행할래요</Button>
            </Box>
            <Box bg='gray' display='flex' justifyContent='center'>
              <Text fontSize='1.5rem'>패키지 검색</Text>
            </Box>

          </Box>
          
        </Box>

        <Box w='50%' bg='blue.200' id='main_slide'> 
          
        </Box>
      </Flex>
    </Box>
  )
}

export default Home;