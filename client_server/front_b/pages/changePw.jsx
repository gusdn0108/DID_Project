import {useState,useEffect} from 'react';
import { Box, Button, Flex, Text, Input, FormControl,
    FormLabel, FormErrorMessage, FormHelperText, useLatestRef,} from "@chakra-ui/react";
import axios from 'axios';
import { backend,frontend } from '../utils/ip';


const mypage = ({userId, email})  => { 
    const [password, setPassword] = useState('')
    
    const getPw = (e) => {
        setPassword(e.target.value)
    }

    const changePw = async () => {
        const response = await axios.post(`${backend}/api/auth/updateUser`, { email, password })
        alert(response.data.status)
    }

    return (    
        <Box pt='6rem'>
            <Box w='30%' mx='auto' my='0' fontSize={'125%'} justifyContent='center'>
                <FormControl mt='3'>
                    <Input type='password' placeholder='password을 입력해주세요' size='md' id='userPw' mb='3%'
                    onChange={getPw}/>
                    <Button onClick={changePw}>변경하기!!</Button>
                </FormControl>    
            </Box>   
        </Box>
    )
}

export default mypage;