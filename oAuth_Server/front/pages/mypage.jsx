import { Box, Flex, Text, Divider, useDisclosure, Center, FormLabel, Button, FormControl, FormHelperText, Radio, Stack, Input, Select, RadioGroup, useTagStyles } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { backend, frontend } from '../utils/ip.js';
import { getCookie } from 'cookies-next';
import crypto from 'crypto';
import AppModal from '../components/appModal.jsx';
import Link from 'next/link.js';
import { deleteCookie } from 'cookies-next';

// 사용자는 마이 페이지에서 자신이 운영하는 서비스를 연동 등록 가능
// 내가 연동한 어플리케이션을 보여주는 리스트도 만들자..
// 발급 받기 > 연동할 어플리케이션 이름을 입력하면 rest api, secret등을 준다.

// rest api를 발급받고 redirect uri를 발급받을 로컬 서버 관리자는
// 로그인이 된 상태라고 가정

const Mypage = ({ appList }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [myAppList, setmyAppList] = useState(appList);
	const [name, setName] = useState(' ');
	const [gender, setGender] = useState(' ');
	const [age, setAge] = useState(' ');
	const [address, setAddress] = useState(' ');
	const [mobile, setMobile] = useState(' ');
	const [password, setPassword] = useState(' ');
	const [pwCheck, setPwCheck] = useState(false); //뒤에 비밀번호 수정

	const [pwdCheck, setPwdCheck] = useState(''); //첫번째 비밀번호입력란

	const [email, setEmail] = useState(' ');
	const [hashId, setHashId] = useState(' ');

	const getAddress = (e) => {
		setAddress(e.target.value);
	};
	const getName = (e) => {
		setName(e.target.value);
	};
	const getMobile = (e) => {
		setMobile(e.target.value);
	};
	const getAge = (e) => {
		setAge(e.target.value);
	};
	const getGender = (e) => {
		setAddress(e.target.value);
	};

	const createApp = () => {
		location.href = `${frontend}/appRegi`;
	};

	// const getMyApp = async () => {
	//     const email = '619049@naver.com'
	//     const response = await axios.post(`${backend}/api/oauth/getMyApp`, { email: email })

	//     setmyAppList(response.data.myapp)
	// }

	// const showAppList = myAppList.map((v, k) => {
	//     return (
	//         <Box p='5%' key={k}>
	//             <Flex justifyContent={'space-around'}>
	//                 <Text px='5%'><Link href={{ pathname: `/appinfo`, query: { appName: v.appName } }}>{v.appName}</Link></Text>
	//                 <Text>{v.restAPI}</Text>
	//             </Flex>
	//         </Box>
	//     );
	// });

	const getUser = async () => {
		let userInfo;
		const Cookie = getCookie('user');
		//user?

		if (Cookie) {
			//cookier가있으면
			userInfo = JSON.parse(Buffer.from(Cookie, 'base64').toString('utf-8'));
		}

		//userInfo.email 이거 물어보기 or console찍어보기
		setEmail(userInfo.email);
		setHashId(userInfo.hashId);
	};

	const getUserInfo = async () => {
		//hashId값으로 요청
		const response = await axios.post('http://localhost:8000/Oauth/user/searchUser', { hashId: hashId });

		setName(response.data.name);
		setAddress(response.data.addr);
		setAge(response.data.age);
		setMobile(response.data.mobile);
		setGender(response.data.gender);
		setEmail(response.data.email);

		//response 객체안에 data
	};

	const setPwdCheckfunction = (e) => {
		setPwdCheck(e.target.value); //값을 입력받기위해서 만든함수
	};

	//버튼눌렀을떄 업데이트해주려고
	const checkPwdfunction = () => {
		console.log(email);
		console.log(hashId);
		const userHash = email + pwdCheck;

		const Hash = crypto.createHash('sha256').update(userHash).digest('base64');

		if (hashId === Hash) {
			setPwCheck(true); //true
			getUserInfo();
		} else {
			alert('비밀번호가 일치하지 않습니다.');
		}
	};

	const updateUser = async () => {
		const hashId = email + pwdCheck;

		const Hash = crypto.createHash('sha256').update(hashId).digest('base64');

		const body = {
			gender: gender,
			name: name,
			age: age,
			addr: address,
			mobile: mobile,
			email: email,
			hashId: Hash,
		};

		const response = await axios.post('http://localhost:8000/Oauth/user/upDateUser', body);

		console.log(response.data);

		if (response.data.status == true) {
			setName(response.data.name);
			setAddress(response.data.addr);
			setAge(response.data.age);
			setMobile(response.data.mobile);
			setGender(response.data.gender);
			setEmail(response.data.email);

			// getUserInfo()
		} else {
			alert(response.data.msg);
		}
	};

	const deleteUser = async () => {
		const hashId = email + pwdCheck;

		const Hash = crypto.createHash('sha256').update(hashId).digest('base64');

		const response = await axios.post('http://localhost:8000/api/oauth/deleteUser', { hashId: Hash });

		if (response.data.status) {
			deleteCookie('user', { req, res, maxAge: 60 * 60 * 24 * 1000 });

			alert(response.data.msg);
			window.location.replace('/');
		} else {
			alert(response.data.msg);
		}
	};

	//해야되는거 입력받게하기 O
	//변경하기 누르면 변경되는 함수 만들기 o
	//백에는 바꾸기 완료

	//+ 새 홈페이지에 바꾼거 보여주기
	//gerUserInfo()하면 될줄알았는데 백정보를 못가져온다 왜?

	//delete 함수랑 버튼 만들기

	//back에서 db에서 저장?
	//front에서 다시 출력?
	useEffect(() => {
		//렌더될떄 추가개념공부필요
		// getMyApp()
		getUser();
	}, [isOpen]);

	//3항연산자랑 <>
	return (
		<Center w='100%'>
			<Box w='40%' m='0 5%' h='20rem' mx='auto' bg='red' pt='5rem'>
				<Flex mx='auto' my='0' justifyContent={'center'} mb='10%'>
					<Box w='40%' mx='auto' my='0'>
						<Text>어플리케이션 등록</Text>
						<Button onClick={onOpen}>어플리케이션 생성</Button>
						<AppModal isOpen={isOpen} onClose={onClose} />
					</Box>
				</Flex>
				<Flex>
					<Box mx='auto' my='0' justifyContent={'center'}>
						<Text>내 어플리케이션</Text>

						<Box>{/* {showAppList} */}</Box>
					</Box>
				</Flex>
			</Box>
			<Box w='40%' m='0 5%' h='20rem' pt='5rem'>
				{pwCheck === false ? (
					<>
						<Center>
							<Box w='100%'>
								<Text textAlign={'center'} fontSize={'200%'} mb='2rem'>
									{' '}
									회원정보
								</Text>
							</Box>
						</Center>

						<Divider />
						<Text fontSize={'130%'} mt='2rem' mb='1rem'>
							{' '}
							비밀번호 입력
						</Text>
						<Input type='password' placeholder='패스워드를 입력해주세요' id='password' size='md' onChange={setPwdCheckfunction} />

						<Center>
							<Button colorScheme='yellow' mb='2rem' variant='outline' mt='2rem' onClick={checkPwdfunction}>
								{' '}
								확인
							</Button>
						</Center>
					</>
				) : (
					<>
						<FormControl mt='3'>
							<Text fontSize={'180%'} px='35%'>
								회원정보수정
							</Text>
							<FormLabel fontSize={'140%'} px='2%' mb='3%'>
								이메일
							</FormLabel>
							<Flex justifyContent={'center'}>
								<Input type='text' placeholder='email을 입력해주세요' id='userEmail' value={email} size='md' mb='5%' disabled />
							</Flex>

							<FormLabel fontSize={'140%'} px='2%'>
								이름
							</FormLabel>
							<Input type='text' placeholder='이름을 입력해주세요' size='md' mb='5%' value={name} onChange={getName} />

							<FormLabel fontSize={'140%'} px='2%' mb='2%'>
								성별
							</FormLabel>
							<RadioGroup fontSize={'140%'} mb='5%' px='3%' defaultValue={gender === 'm' ? 'm' : 'f'}>
								<Stack direction='row'>
									<Radio value='m' mr='2%'>
										남자
									</Radio>
									<Radio value='f'>여자</Radio>
								</Stack>
							</RadioGroup>

							<FormLabel fontSize={'140%'} px='2%'>
								나이
							</FormLabel>
							<Input placeholder='나이를 입력해주세요' mb='5%' size='md' value={age} onChange={getAge} />

							<FormLabel fontSize={'140%'} px='2%'>
								주소
							</FormLabel>
							<Input type='text' mb='5%' size='md' placeholder='주소를 입력해주세요' value={address} onChange={getAddress} />

							<FormLabel fontSize={'140%'} px='2%'>
								전화번호
							</FormLabel>
							<Input type='mobile' mb='5%' size='md' placeholder='전화번호를 입력해주세요' value={mobile} onChange={getMobile} />
						</FormControl>
						<Center>
							<Button colorScheme='yellow' mb='2rem' variant='outline' onClick={updateUser}>
								변경하기
							</Button>
						</Center>
						<Divider />

						<Text fontSize={'180%'} px='35%' pt='4rem'>
							비밀 번호 수정
						</Text>

						<FormLabel fontSize={'140%'} px='2%' pt='2rem'>
							변경 할 비밀번호
						</FormLabel>
						<Input type='password' placeholder='패스워드를 입력해주세요' id='password' size='md' />
						<FormLabel fontSize={'140%'} px='2%' pt='2rem'>
							비밀번호 확인
						</FormLabel>
						<Input type='password' placeholder='패스워드를 입력해주세요' id='password' size='md' />
						<Center>
							<Button colorScheme='yellow' mb='2rem' mt='2rem' variant='outline'>
								변경하기
							</Button>
						</Center>

						<Divider />
						<Text fontSize={'180%'} px='35%' pt='4rem' textAlign={'center'}>
							{' '}
							회원 탈퇴{' '}
						</Text>

						<Center>
							<Button colorScheme='yellow' mb='2rem' variant='outline' mt='2rem' onClick={deleteUser}>
								{' '}
								회원탈퇴버튼
							</Button>
						</Center>
					</>
				)}
			</Box>
		</Center>
	);
};

// export const getServerSideProps = async () => {
//     const email = '619049@naver.com'
//     const response = await axios.post(`${backend}/api/oauth/getMyApp`, { email: email })

//     return { props: { appList: response.data.myapp } };
// };

export default Mypage;
