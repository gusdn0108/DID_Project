import {useState,useEffect} from 'react';
import { Box, Button, Flex, Text, Input, FormControl,
    FormLabel, FormErrorMessage, FormHelperText,} from "@chakra-ui/react";


const mypage = ({userId, email})  => {
    const [ point, setPoint ] = useState(0)
    
    const didRegister = () => {
        console.log('did 연동 페이지로 이동!')
        console.log(userId)
    }

    const getPoint = async () => {
        await setPoint(100)
    }

    useEffect(() => {
        getPoint()
    },[])

    return (
        <Box pt='6rem'>
            <Text>{userId}님 안녕하세요</Text>
            <Text> email : {email}</Text>

            <Text>point : {point}</Text>
            <Button onClick={didRegister}>
                DID login 연동하기
            </Button>
        </Box>
    )
}

// mypage.getInitialProps = ({req}) => {
//     const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie )
//     // console.log(cookies)
//     return {
//       initialUserid: cookies.userId
//     }
// }

export default mypage;