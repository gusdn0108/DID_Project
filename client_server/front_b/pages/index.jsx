import { Box, Button, Flex, Text, Input, Link, FormControl,
  FormLabel, FormErrorMessage, FormHelperText,} from "@chakra-ui/react";
import {useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import cookie from 'cookie'

const Home = ({userId}) => {
  console.log(userId)
  
  // useEffect(() => {
  //   Cookie.set('userId', userId)
  // }, [userId])

  return (
    <Box>
      <h1>여행 사이트 경일투어</h1>
      <h1 m ='20'>{userId}</h1>
    </Box>
  )
}

// Home.getInitialProps = ({req}) => {
//   const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie )
//   // console.log(cookies)
//   return {
//     initialUserid: cookies.userId
//   }
// }

export default Home;