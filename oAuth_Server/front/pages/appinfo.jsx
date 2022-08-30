import { Box, Button, Flex, Text, Input, FormControl, Image,
    FormLabel, FormErrorMessage, FormHelperText, Select, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import axios from 'axios'
import { useState, useEffect } from "react";
import { backend } from '../utils/ip.js'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AppInfo = () => {
    const router = useRouter()
    const email = '619049@naver.com'
    const appName = router.query.appName
    const [ showInfo, setShowInfo ] = useState(false)
    const [ appInfo, setAppInfo ] = useState(undefined)
    const [ isModifying, setIsModifying ] = useState(null)
    const [ uri, seturi ] = useState(undefined)

    const revealInfo = async () => {
        const response = await axios.post(`${backend}/api/oauth/appinfo`, 
        {appName: router.query.appName, email:email})
        console.log(response.data.appInfo)
        setAppInfo(response.data.appInfo)
        seturi(response.data.appInfo.redirectURI)
        setShowInfo(true)
    }

    const setUri = (k) => (e) => {
        uri[k] = e.target.value
    }

    const confirmURI = (k) => (e) => {
        if( e.key !=='Enter') return;
        setIsModifying(null)
    }

    const modifyRed = async () => {
        const response = await axios.post(`${backend}/api/oauth/updateRedirect`, {uri, email:email, appName: appName})
        alert(response.data.msg)
    }

    const uris = uri?.map((v,k) => {
        return(
            <Box key={k}>
                {
                    isModifying == k
                    ?
                    <Input placeholder="redirect url을 등록해주세요." 
                    defaultValue={uri[k]}
                    onChange ={setUri(k)}
                    onKeyDown={confirmURI(k)}
                    />
                    :
                    (
                        uri[k]== null 
                        ?
                        <Text onClick={() => setIsModifying(k)}>
                            redirect uri를 등록해주세요
                        </Text>
                        :
                        <Text onClick={() => setIsModifying(k)}>{uri[k]}</Text>
                    )
                }
            </Box>
        )
    })

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
                            <Box>
                                <Text> Rest API : {appInfo.restAPI}</Text>
                                <Text> Client Secret : { appInfo.clientSecretKey } </Text>
                                <Text> 시크릿 키는 노출되지 않도록 주의해주세요.</Text>
                            </Box>

                            <Flex>
                                <Flex>Redirect URI</Flex>
                                
                                <Text>리다이렉트 url은 최대 5개까지 등록할 수 있습니다.</Text>
                                <Box>
                                    {uris}
                                </Box>
                            </Flex>
                            <Button onClick={modifyRed}>수정 완료</Button>
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