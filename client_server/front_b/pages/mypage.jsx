import {useState,useEffect} from 'react';
import { Box, Button, Flex, Text, Input, FormControl,
    FormLabel, FormErrorMessage, FormHelperText,} from "@chakra-ui/react";
import axios from 'axios';
import { backend } from '../utils/ip';


const mypage = ({userId, email, point})  => {
    const [tryDid, setTryDid] = useState(false)
    const [ pw, setPw ] = useState(undefined) 

    const didRegister = () => {
        setTryDid(true)
    }

    const getPs = (e) => {
        setPw(e.target.value)
    }

    const didLoginHandler = async () => {
        const response = await axios.post(`${backend}/api/auth/oauthRegister`, {email, password : pw})
        console.log(response.data)
    }

    return (
        <Box pt='6rem'>
            {
                tryDid == false 
                ?
            <>
                <Text>{userId}님 안녕하세요</Text>
                <Text> email : {email}</Text>

                <Text>point : {point}</Text>
                <Button onClick={didRegister}>
                    DID login 연동하기
                </Button>
            </>
            :
            <>
                <FormControl>
                    <Text> 비밀번호를 다시 한 번 입력해주세요. </Text>

                    <FormLabel fontSize='2xl' mb='2.5'>Password</FormLabel>
                    <Input type='password' placeholder='password을 입력해주세요' size='md' id='userPw' mb='5' onChange={getPs}/>
                    <Button onClick={didLoginHandler} colorScheme='blue' w='32' m='0.25rem'>DID register</Button>
                </FormControl>
            </>
            }
        </Box>
    )
}

export default mypage;