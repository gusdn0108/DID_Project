import { Box, Button, Flex, useDisclosure, Image, Input, Text } from '@chakra-ui/react';
import Link from 'next/link';
import LoginModal from './LoginModal'
import {useEffect, useState} from 'react'
import { deleteCookie } from 'cookies-next';
import { cookieDomain, frontend } from '../utils/ip';

const Header = ({userId}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const logoutHandler = () => {
        deleteCookie('loginInfo', {path: '/', domain:`${cookieDomain}`})
        location.href=`${frontend}`
    }

    useEffect(() => {

    },[userId])

    return (
        <Box border='1px' borderColor='gray.200'>
            <Flex position="fixed" justifyContent="space-between" px="10" py="2" w="full" bg="white" alignItems='center' >
                <Box>
                    <Link href="/"><Button size='sm' variant='ghost' fontSize='xl' pt='0.5rem'>Kyungil Tour</Button></Link>
                    <Input type='text' w = '24rem' borderRadius='1.25rem' pt='0rem'/>
                </Box>
                <Box>
                    {
                        userId 
                        ?
                        <>
                            <Button onClick={logoutHandler}>logout</Button>
                            <Link href='mypage'><Button size='sm' variant='ghost'>my page</Button></Link>
                        </>
                        :
                        <>
                            <Button colorScheme='blue'onClick={onOpen}>login</Button>
                            <LoginModal isOpen={isOpen} onClose={onClose}/>
                            <Button colorScheme='gray' w='32' m='0.25rem'><Link href='/register'>회원 가입</Link></Button>
                        </>
                    }
                    
                </Box>
            </Flex>
        </Box>
    );
}

// Header.getInitialProps = ({req}) => {
//     const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie )
//     // console.log(cookies)
//     return {
//       initialUserid: cookies.userId
//     }
// }

export default Header;