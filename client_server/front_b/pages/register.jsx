import { Box, Button, Flex, Text, Input, FormControl,
    FormLabel, FormErrorMessage, FormHelperText,} from "@chakra-ui/react";
import axios from 'axios'
import { useState } from "react";
import { backend } from '../utils/ip.js'
import { phoneCheck, pwdCheck } from "../utils/regiCheck.js";

const register = () => {
    const [ password, setPassword ] = useState(undefined)
    const [ psError, setpsError] = useState(true)

    const setpwdCheck = (e) => {
        setPassword(e.target.value)
        setpsError(pwdCheck(password))
    }

    const register = async () => {
        const email = document.querySelector('#userEmail').value
        const userPw = document.querySelector('#password').value
        const userName = document.querySelector('#userNickname').value

        const signupData = { email, userPw, userName }

        if(pwdCheck(userPw) == false) {
            alert('비밀번호는 영문자, 숫자, 특수문자 조합으로 8~15자리를 사용해주세요.')      
            return;      
        }

        try {
            const response = await axios.post(`${backend}/api/auth/Signup`, signupData )
            console.log(response)
        }
        catch(e) {
            alert(e.response.data)
        }
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

                    <FormLabel>Password</FormLabel>
                    <Input type='password' onChange={setpwdCheck} placeholder='password을 입력해주세요' id='password' size='sm'/>
                    <FormHelperText>
                        {
                            psError == true
                            ?
                            '사용 가능한 비밀번호입니다.'
                            :
                            '비밀번호는 영문자, 숫자, 특수문자 포함 8~15자입니다.'
                        }
                    </FormHelperText>

                    <Input type='submit' value='회원가입' onClick={register}/>
                </FormControl>
            </Box>
        </Box>
    )
}

export default register;