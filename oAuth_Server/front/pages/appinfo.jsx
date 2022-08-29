import { Box, Button, Flex, Text, Input, FormControl, Image,
    FormLabel, FormErrorMessage, FormHelperText, Select, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import axios from 'axios'
import { useState, useEffect } from "react";
import { backend } from '../utils/ip.js'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AppInfo = () => {
    const router = useRouter()
    const [ showInfo, setShowInfo ] = useState(false)
    const [appInfo, setAppInfo] = useState(undefined)
    const email = '619049@naver.com'

    const revealInfo = async () => {
        const response = await axios.post(`${backend}/api/oauth/appinfo`, {appName: router.query.appName, email:email})
        console.log(response.data.appInfo)
        setAppInfo(response.data.appInfo)
        setShowInfo(true)
    }

    return(
        <>
            <Box justifyContent={'center'} pt='5%' w='80%' mx='auto' my='0'>
                <Flex justifyContent={'center'}>
                    {router.query.appName} 
                </Flex>

                <Flex display={'block'}>
                    {
                        showInfo == false ?
                        <Button onClick={revealInfo}>Rest api, client_secret 보기</Button>
                        :
                        <>
                            <Text> Rest API : {appInfo.restAPI}</Text>
                            <Text> Client Secret : { appInfo.clientSecretKey } </Text>
                            <Text> 시크릿 키는 노출되지 않도록 주의해주세요.</Text>

                            <Flex>
                                <Flex>Redirect URI</Flex>
                                <Box>
                                    {
                                        appInfo.redirectURI == null ?
                                        <Box>등록한 redirectURI가 없습니다.</Box>
                                        :
                                        appInfo.redirectURI
                                    }
                                </Box>
                            </Flex>
                        </>
                    }    
                </Flex>

                <Flex>
                    
                </Flex>
            </Box>
        </>
    )
}

// export const getServerSideProps = async () => {
//     const router = useRouter()
//     const email = '619049@naver.com'
//     const appName = router.pathname.split('?')[1].split('=')[1]
//     const qwe = router.query
//     console.log(appName, qwe)
//     const response = await axios.post(`${backend}/api/oauth/getMyApp`, {appName: appName, email:email})
  
//     return { props: {appInfo : response.data.status} };
// };

export default AppInfo;