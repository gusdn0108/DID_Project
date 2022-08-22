import { Box, Button, Flex, Text, Input, FormControl,
    FormLabel, FormErrorMessage, FormHelperText,} from "@chakra-ui/react";
import axios from 'axios'
import { useEffect } from "react";
import { useState } from "react";
import { backend, frontend } from '../utils/ip.js'
import { phoneCheck, pwdCheck } from "../utils/regiCheck.js";

const register = () => {
    const [ password, setPassword ] = useState(undefined)
    const [ psError, setpsError] = useState(true)
    
    const [ sentEmail, setSentEmail ] = useState(false)
    const [ verifyNum, setVerifyNum ] = useState(undefined)

    const [ email, setEmail] = useState('')
    const [ nickName, setNick ] = useState('')

    const setpwdCheck = (e) => {
        setPassword(e.target.value)
        setpsError(pwdCheck(password))
    }

    const getEmail = (e) => {
        setEmail(e.target.value)
    }

    const getNick = (e) => {
        setNick(e.target.value)
    }

    const invalidation = () => {
        setTimeout(setVerifyNum(undefined), 1000 * 60 * 3)
    }

    const sendEmail = async () => {
        const temail = document.querySelector('#userEmail').value
        const tuserPw = document.querySelector('#password').value
        const tuserName = document.querySelector('#userNickname').value

        setEmail(temail)
        setNick(tuserName)
        setPassword(tuserPw)

        if(pwdCheck(tuserPw) == false) {
            alert('비밀번호는 영문자, 숫자, 특수문자 조합으로 8~15자리를 사용해주세요.')      
            return;      
        }

        try {
            const response = await axios.post(`${backend}/api/auth/email`, {email, nickName})

            setSentEmail(true)
            const verifyArray = response.data.number
            const verfifyNumber = verifyArray[0]+verifyArray[1]+verifyArray[2]+verifyArray[3]+verifyArray[4]+verifyArray[5]

            setVerifyNum(verfifyNumber)
            invalidation
        }
        catch(e) {
            console.error(e)
        }
    }

    const verifyAccount = async() => {
        const verifier = document.querySelector('#verifier').value
        if(verifier == verifyNum) {
            try {
                const response = await axios.post(`${backend}/api/auth/Signup`, { email, password, nickName } )
                if(response.data.status == 1) {
                    alert('회원가입이 완료되었습니다.')
                    location.href=`${frontend}`
                }
            }
            catch(e) {
                console.error(e)
            }
        }
        else {
            alert('인증 번호가 일치하지 않습니다')
            return;
        }
    }

    return(
        <Box display='flex' justifyContent='center'>
            <Box pt='4rem' display='flex' justifyContent='center' w='20rem'>                
                <FormControl mt='3'>
                    <Text>회원 가입</Text>
                    {
                        sentEmail == false
                        ?
                        <>
                            <FormLabel>Email</FormLabel>
                            <Input type='text' onChange={getEmail}placeholder='email을 입력해주세요' id='userEmail' size='sm' defaultValue='619049@naver.com' />

                            <FormLabel>Nickname</FormLabel>
                            <Input type='text' onChange={getNick} placeholder='Nickname을 입력해주세요' id='userNickname' size='sm' defaultValue='sila'/>

                            <FormLabel>Password</FormLabel>
                            <Input type='password' onChange={setpwdCheck} placeholder=' password을 입력해주세요' id='password' size='sm'/>
                            <FormHelperText>
                                {
                                    psError == true
                                    ?
                                    '사용 가능한 비밀번호입니다.'
                                    :
                                    '비밀번호는 영문자, 숫자, 특수문자 포함 8~15자입니다.'
                                }
                            </FormHelperText>
                        </>
                        :
                        ""
                    }
                    {
                        sentEmail == false ?
                        <Input type='submit' value='회원가입' onClick={sendEmail}/>
                        :
                        <>
                        <Input type='text' placeholder="발송된 6자리 숫자를 입력하세요" id='verifier'/>
                        <FormHelperText>인증 번호는 3분간 유효합니다.</FormHelperText>
                        <Input type='submit' onClick={verifyAccount}/>
                        </>
                    }
                    
                </FormControl>
            </Box>
        </Box>
    )
}

export default register;