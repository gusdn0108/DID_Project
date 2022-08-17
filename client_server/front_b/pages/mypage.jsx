import {useState,useEffect} from 'react';
import { Box, Button, Flex, Text, Input, FormControl,
    FormLabel, FormErrorMessage, FormHelperText,} from "@chakra-ui/react";

import Cookie from 'js-cookie';
import cookie from 'cookie'

const mypage = ({initialUserid}) => {
    //console.log(initialUserid)
    const [ userId, setUserid ] = useState(initialUserid)
    const [ point, setPoint ] = useState(0)

    useEffect(() => {
        Cookie.set('userId', userId)
    }, [userId])
    
    const didRegister = () => {
        console.log('did 연동 페이지로 이동!')
    }

    const getPoint = async () => {
        await setPoint(100)
    }

    useEffect(() => {
        getPoint()
    },[])

    return (
        <Box pt='4rem'>
            <Text>{userId}님 안녕하세요</Text>
            <Text>point : {point}</Text>
            <Button onClick={didRegister}>
                DID login 연동하기
            </Button>
        </Box>
    )
}

mypage.getInitialProps = ({req}) => {
    const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie )
    // console.log(cookies)
    return {
      initialUserid: cookies.userId
    }
}

export default mypage;