import { Box, Button, Flex, useDisclosure, Image, Input } from '@chakra-ui/react';
import Link from 'next/link';
import LoginModal from './LoginModal'
import {useState} from 'react'

const Header = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <Box border='1px' borderColor='gray.200'>
            <Flex position="fixed" justifyContent="space-between" px="10" py="2" w="full" bg="white" alignItems='center' >
                <Box>
                    <Link href="/"><Button size='sm' variant='ghost' fontSize='xl' pt='0.5rem'>Kyungil Tour</Button></Link>
                    <Input type='text' w = '24rem' borderRadius='2rem' pt='0rem'/>
                </Box>
                <Box>
                    <Button colorScheme='blue'onClick={onOpen}>login</Button>
                    <LoginModal isOpen={isOpen} onClose={onClose}/>

                    
                    {/* 로그인 되어있다면 로그아웃, vice versa가 되도록 */}
                    
                    <Link href='mypage'><Button size='sm' variant='ghost'>my page</Button></Link>
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