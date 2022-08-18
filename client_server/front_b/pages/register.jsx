import { Box, Button, Flex, Text, Input, FormControl,
    FormLabel, FormErrorMessage, FormHelperText,} from "@chakra-ui/react";
import axios from 'axios'
import {backend} from '../utils/ip.js'

const register = () => {
    const register = async () => {
        const email = document.querySelector('#userEmail').value
        const userPw = document.querySelector('#password').value
        const userName = document.querySelector('#userNickname').value
        const userMobile = document.querySelector('#userPhone').value

        const signupData = { email, userPw, userName, userMobile }
        console.log(signupData)
        console.log(backend)
    
        const response = await axios.post(`${backend}/api/auth/Signup`, signupData )
        console.log(response)
    }

    return(
        <Box display='flex' justifyContent='center'>
            <Box pt='4rem' display='flex' justifyContent='center' w='20rem'>                
                <FormControl mt='3'>
                    <Text>회원 가입</Text>
                    
                    <FormLabel>Email</FormLabel>
                    <Input type='text' placeholder='email을 입력해주세요' id='userEmail' size='sm'/>

                    <FormLabel>Nickname</FormLabel>
                    <Input type='text' placeholder='Nickname을 입력해주세요' id='userNickname' size='sm'/>

                    <FormLabel>Mobile</FormLabel>
                    <Input type='text' placeholder='Mobile을 입력해주세요' id='userPhone' size='sm'/>
                    
                    <FormLabel>Password</FormLabel>
                    <Input type='password' placeholder='password을 입력해주세요' id='password' size='sm'/>

                    <Input type='submit' value='회원가입' onClick={register}/>
                </FormControl>
            </Box>
        </Box>
    )
}

export default register;