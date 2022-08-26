import { Box, Button, Flex, Text, Input, FormControl, Image,
    FormLabel, FormErrorMessage, FormHelperText, Select, Radio, RadioGroup, Stack} from "@chakra-ui/react";
import axios from 'axios'
import { useState } from "react";
import { backend, frontend } from '../utils/ip.js'

// rest api를 발급받고 redirect uri를 발급받을 로컬 서버 관리자는
// 로그인이 된 상태라고 가정

const ServerRegi = () => {
    const [ restApi, setRestApi ] = useState()
    const getRestApi = () => {
        console.log('우하하')
    }
    return (
      <>
        <Box px='5%' py='5%'>
            <Flex mx='auto' my='0' justifyContent={'center'}>
                <Box>App name : {location.href.split('?')[1].split('=')[1]}</Box>
                <Text> RestAPI 를 발급받으려면 버튼을 클릭해주세요 </Text>
                <Button onClick={getRestApi}>REST API 발급 받기</Button>
            </Flex>
        </Box>
      </>
    )
}

export default ServerRegi;