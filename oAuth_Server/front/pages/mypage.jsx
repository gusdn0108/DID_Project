import { Box, Button, Flex, Text, Input, FormControl, Image,
    FormLabel, FormErrorMessage, FormHelperText, Select, Radio, RadioGroup, Stack} from "@chakra-ui/react";
import axios from 'axios'
import { useState } from "react";
import { backend, frontend } from '../utils/ip.js'

// 사용자는 마이 페이지에서 자신이 운영하는 서비스를 연동 등록 가능
// 내가 연동한 어플리케이션을 보여주는 리스트도 만들자..
// 발급 받기 > 연동할 어플리케이션 이름을 입력하면 rest api, secret등을 준다.

// rest api를 발급받고 redirect uri를 발급받을 로컬 서버 관리자는
// 로그인이 된 상태라고 가정

const Mypage = () => {
    const [appName, setAppName] = useState(undefined)
    
    const createApp = () => {
        location.href=`${frontend}/appRegi/?appName=${appName}`
    }

    return (
      <>
        <Box px='5%' py='5%' w='70%' mx='auto' my='0'>
            <Flex mx='auto' my='0' justifyContent={'center'} mb='10%'>
                <Box w='40%'>
                    <Text>어플리케이션 등록</Text>
                    <Input type='text' placeHolder='어플리케이션 이름을 입력해주세요'
                    onChange={(e) => setAppName(e.target.value)}
                    />
                    <Button onClick={createApp}>어플리케이션 생성</Button>
                </Box>
            </Flex>
            <Flex mx='auto' my='0' justifyContent={'center'}>
                <Box>
                    어플리케이션 리스트
                </Box>
            </Flex>
        </Box>
      </>
    )
}

export default Mypage;