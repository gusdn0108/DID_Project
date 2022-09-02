import { Box, Button, Flex, Text, Input, Image, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { backend } from '../utils/ip';
import { setCookie } from 'cookies-next';
export default function Home() {
	const [DIDid, setDIDid] = useState(undefined);
	const [DIDPw, setDIDPw] = useState(undefined);

	//const [isLogin,setIsLogin] = useState(false)

	const getId = (e) => {
		setDIDid(e.target.value);
	};

	const getPw = (e) => {
		setDIDPw(e.target.value);
	};

	const didLoginHandler = async (req, res) => {
		//앞에 상태변수를 요청
		const response = await axios.post('http://localhost:8000/Oauth/login/localAuthorize', { email: DIDid, password: DIDPw });
		//보내온 데이터의 status 가 true면,
		//payload 라는변수에 split으로 잘라넣고
		//setCookie(쿠키생성)
		if (response.data.status == true) {
			const payload = response.data.token.split('.')[1];
			setCookie('user', payload, { req, res, maxAge: 60 * 60 * 24 * 1000 });
			location.href = 'http://localhost:8080/mypage';
			//다했ㄷ으니 마이페이지로 쿠키와함께 화면전환
		} else {
			alert(response.data.msg);
		}
	};

	return (
		<>
			<Flex w='60%' mx='auto' my='4%' justifyContent={'center'}>
				<Box w='50%' mx='3%' px='5%' py='6%'>
					<Text fontSize={'1.5rem'} mb='2%'>
						DID login으로 a/b/c/d 사이트를 이용해보세요!
					</Text>
					<Text fontSize='0.75rem' mb='0.5%'>
						a/b/c/d 사이트는 DID login으로 이용할 수 있습니다
					</Text>
					<Text fontSize='0.75rem' mb='4%'>
						사용 중인 DID계정으로 로그인해 보세요
					</Text>
					<Image mr='1%' src='https://accounts.kakao.com/assets/weblogin/techin/retina/banner_login2-7800b65948f0912306346a56a61832a98aa302c7e6cf3411eacd35db47d53a3c.png'></Image>
				</Box>

				<Box w='35%' mx='3%' border={'1px'} borderColor='gray.200' px='5%' py='5%'>
					<Text fontSize={'2rem'} mb='1rem'>
						DID Service
					</Text>
					<FormControl mb='1rem'>
						<FormLabel fontSize='xl' mb='2.5'>
							Email
						</FormLabel>
						<Input type='text' placeholder='email을 입력해주세요' size='md' id='Email' mb='7%' onChange={getId} />

						<FormLabel fontSize='xl' mb='2.5'>
							Password
						</FormLabel>
						<Input type='password' placeholder='password을 입력해주세요' size='md' id='userPw' mb='5%' onChange={getPw} />
					</FormControl>
					<Button onClick={didLoginHandler} bg='yellow.300' w='100%'>
						로그인
					</Button>
					<Button
						onClick={() => {
							window.location.replace('/register');
						}}
						colorScheme='yellow'
						variant='outline'
						w='100%'
						mt='2rem'
					>
						회원가입{' '}
					</Button>
				</Box>
			</Flex>
		</>
	);
}
