import { Box, Button, Flex, Text, Input, FormControl,
    FormLabel, FormErrorMessage, FormHelperText,} from "@chakra-ui/react";

const register = () => {
    const register = () => {
        const userEmail = document.querySelector('#userEmail')
        const userPw = document.querySelector('#password')
        const userNickname = document.querySelector('#userNickname')
        console.log(userEmail.value, userPw.value, userNickname.value)
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
                    <Input type='password' placeholder='password을 입력해주세요' id='password' size='sm'/>

                    <Input type='submit' value='회원가입' onClick={register}/>
                </FormControl>
            </Box>
        </Box>
    )
}

export default register;