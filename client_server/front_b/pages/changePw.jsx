import {useState,useEffect} from 'react';
import { Box, Button, Flex, Text, Input, FormControl,
    FormLabel, FormErrorMessage, FormHelperText, useLatestRef,} from "@chakra-ui/react";
import axios from 'axios';
import { backend,frontend } from '../utils/ip';


const mypage = ({userId, email})  => { 

    return (
        <Box pt='6rem'>
            <Box w='30%' mx='auto' my='0' fontSize={'125%'} justifyContent='center'>
                <FormControl mt='3'>
                    <Input type='password' placeholder='password을 입력해주세요' size='md' id='userPw' mb='3%'/>
                </FormControl>    
            </Box>   
        </Box>
    )
}

export default mypage;