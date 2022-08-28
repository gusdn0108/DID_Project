import { Box, Button, Flex, Text, Input, FormControl, Image,
    FormLabel, FormErrorMessage, FormHelperText, Select, Radio, RadioGroup, Stack} from "@chakra-ui/react";
import axios from 'axios'
import { useEffect, useState } from "react";
import { backend, frontend } from '../utils/ip.js'

// 사용자는 마이 페이지에서 자신이 운영하는 서비스를 연동 등록 가능
// 내가 연동한 어플리케이션을 보여주는 리스트도 만들자..
// 발급 받기 > 연동할 어플리케이션 이름을 입력하면 rest api, secret등을 준다.

// rest api를 발급받고 redirect uri를 발급받을 로컬 서버 관리자는
// 로그인이 된 상태라고 가정

const Mypage = () => {
    const [ appList, setAppList ] = useState(undefined)
    
    const createApp = () => {
        location.href=`${frontend}/appRegi`
    }

    const getMyApp = async () => {
        const email = '619049@naver.com'
        const response = await axios.post(`${backend}/api/oauth/getMyApp`, {email: email})
        setAppList(response.data.myapp)
    }

    const showAppList = appList.map((v,k) => {
        return(
            <Box p='5%'>
                <Flex justifyContent={'space-around'}>
                    <Text px ='5%'>{v.appName}</Text>
                    <Text>{v.restAPI}</Text>
                </Flex>
            </Box>
        );
    });

    useEffect(()=> {
        getMyApp()
    },[])

    return (
      <>
        <Box px='5%' py='5%' w='70%' mx='auto' my='0'>
            <Flex mx='auto' my='0' justifyContent={'center'} mb='10%'>
                <Box w='40%' mx='auto' my='0'>
                    <Text>어플리케이션 등록</Text>
                    <Button onClick={createApp}>어플리케이션 생성</Button>
                </Box>
            </Flex>
            <Flex>
                <Box mx='auto' my='0' justifyContent={'center'}>
                    <Text>내 어플리케이션</Text>
                    
                    <Box>
                        {showAppList}
                    </Box>
                </Box>
            </Flex>
        </Box>
      </>
    )
}

export default Mypage;