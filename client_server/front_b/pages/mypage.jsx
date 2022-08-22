import {useState,useEffect} from 'react';
import { Box, Button, Flex, Text, Input, FormControl,
    FormLabel, FormErrorMessage, FormHelperText,} from "@chakra-ui/react";
import axios from 'axios';
import { backend } from '../utils/ip';


const mypage = ({userId, email, point})  => {
    const [tryDid, setTryDid] = useState(false)
    const [ pw, setPw ] = useState(undefined) 

    const didRegister = () => {
        setTryDid(!tryDid)
    }

    const getPs = (e) => {
        setPw(e.target.value)
    }

    const didLoginHandler = async () => {
        const response = await axios.post(`${backend}/api/Oauth/oauthregister`, {email, password : pw})
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
                <FormControl w='15%' mx='auto' my='0'>
                    <Text fontSize={'1.25rem'} mb='0.5rem'> 비밀번호를 다시 한 번 입력해주세요. </Text>
                    <Input type='password' placeholder='password을 입력해주세요' size='md' id='userPw' mb='3%' onChange={getPs}/>
                    <Flex justifyContent={'space-evenly'}>
                        <Button onClick={didRegister}> 취소 </Button>
                        <Button onClick={didLoginHandler} colorScheme='blue' w='32' >DID 등록</Button>
                    </Flex>

                </FormControl>
            </>
            }
        </Box>
    )
}

export default mypage;