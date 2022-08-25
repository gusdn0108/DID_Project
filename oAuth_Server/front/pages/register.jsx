import { Box, Button, Flex, Text, Input, FormControl,
    FormLabel, FormErrorMessage, FormHelperText, Select, Radio, RadioGroup, Stack} from "@chakra-ui/react";
import axios from 'axios'
import { useState } from "react";
import { backend, frontend } from '../utils/ip.js'
import { pwdCheck } from "../utils/regiCheck.js";

const register = () => {
    const [ password, setPassword ] = useState(undefined)
    const [ psError, setpsError] = useState(false)
    
    const [ sentEmail, setSentEmail ] = useState(false)
    const [ verifyNum, setVerifyNum ] = useState(undefined)

    const [ email, setEmail] = useState(undefined)
    const [ domain, setDomain ] = useState(undefined) 
    const [ name, setName ] = useState(undefined)
    const [ gender, setGender ] = useState('f')
    const [ age, setAge ] = useState(undefined)
    const [ adr, setAdr ] = useState(undefined)
    const [ birth, setBirth ] = useState(undefined)
    const [ phone, setPhone ] = useState(undefined)

    const setpwdCheck = (e) => {
        setPassword(e.target.value)
        setpsError(pwdCheck(password))
    }

    const getEmail = (e) => {
        setEmail(e.target.value)
    }

    const domainSelect = (e) => {
        setDomain(e.target.value)
    }

    const getName = (e) => {
        setName(e.target.value)
    }

    const getAdr = (e) => {
        setAdr(e.target.value)
    }

    const getAge = (e) => {
        setAge(e.target.value)
    }
    
    const getBirth = (e) => {
        setBirth(e.target.value)
    }

    const selectGender = (e) => {
        setGender(e)
    }

    const getPhone = (e) => {
        setPhone(e.target.value)
    }

    const sendEmail2 = () => {
        console.log(email, password, name, gender, age, adr, birth, phone)
    }

    const sendEmail = async () => {
        const temail = document.querySelector('#userEmail').value
        const tuserPw = document.querySelector('#password').value
        const tuserName = document.querySelector('#userNickname').value

        setEmail(temail)
        setName(tuserName)
        setPassword(tuserPw)

        if(pwdCheck(tuserPw) == false) {
            alert('비밀번호는 영문자, 숫자, 특수문자 조합으로 8~15자리를 사용해주세요.')      
            return;      
        }

        const regiEmail = email + domain
        
        try {
            const response = await axios.post(`${backend}/api/auth/email`, { 
                email: regiEmail, password, name, gender, age, adr, birth, phone})
            setSentEmail(true)
            const verifyArray = response.data.number
            const verfifyNumber = verifyArray[0]+verifyArray[1]+verifyArray[2]+verifyArray[3]+verifyArray[4]+verifyArray[5]

            setVerifyNum(verfifyNumber)
            invalidation
        }
        catch(e) {
            alert(e.response.data)
        }
    }

    const invalidation = () => {
        setTimeout(setVerifyNum(undefined), 1000 * 60 * 3)
    }

    const verifyAccount = async() => {
        const verifier = document.querySelector('#verifier').value
        if(verifier == verifyNum) {
            try {
                const regiEmail = email + domain
                const response = await axios.post(`${backend}/api/auth/Signup`, { email:regiEmail, password, nickName } )
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
                    <Text mb='8%' textAlign={'center'} fontSize='1.5rem'>회원 가입</Text>
                    {
                        sentEmail == false
                        ?
                        <>
                            <FormLabel>Email</FormLabel>
                            <Flex justifyContent={'center'}>
                                <Input type='text' onChange={getEmail} placeholder='email을 입력해주세요' id='userEmail' size='sm' mb='5%'/>
                                <Select placeholder="Select Domain" size='sm' id='domainSelector' onChange={domainSelect}>
                                    <option value="@kakao.com">@kakao.com</option>
                                    <option value="@naver.com">@naver.com</option>
                                    <option value="@gmail.com">@gmail.com</option>
                                </Select>
                            </Flex>

                            <FormLabel>name</FormLabel>
                            <Input type='text' onChange={getName} placeholder='name을 입력해주세요'size='sm' mb='5%'/>

                            <FormLabel>성별</FormLabel>
                            <RadioGroup onChange={selectGender}  
                            value={gender}>
                                <Stack direction='row'>
                                    <Radio value='m'>남자</Radio>
                                    <Radio value='f'>여자</Radio>
                                </Stack>
                            </RadioGroup>
                            
                            <FormLabel>나이</FormLabel>
                            <Input
                            placeholder="나이를 입력해주세요" onChange={getAge}/>

                            <FormLabel>생년월일</FormLabel>
                            <Input placeholder="생년월일 8자리를 입력해주세요" onChange={getBirth}/>

                            <FormLabel>주소</FormLabel>
                            <Input placeholder="주소를 입력해주세요" onChange={getAdr}/>

                            <FormLabel>전화번호</FormLabel>
                            <Input placeholder="전화번호를 입력해주세요" onChange={getPhone}/>

                            <FormLabel>Password</FormLabel>
                            <Input type='password' onChange={setpwdCheck} placeholder=' password을 입력해주세요' id='password' size='sm' />
                            <FormHelperText mb='6%'>
                                {
                                    psError == true
                                    ?
                                    '사용 가능한 비밀번호입니다.'
                                    :
                                    '비밀번호는 영문자, 숫자, 특수문자 포함 8~15자여야 합니다.'
                                }
                            </FormHelperText>
                        </>
                        :
                        ""
                    }
                    {
                        sentEmail == false ?
                        <Input type='submit' value='회원가입' onClick={sendEmail2}/>
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