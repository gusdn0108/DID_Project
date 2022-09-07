import { Box, Flex, Text, Divider, Spinner,useDisclosure, Center, FormLabel, Button, FormControl, FormHelperText, Radio, Stack, Input, Select, RadioGroup, useTagStyles } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { backend, frontend } from '../utils/ip.js';
import { getCookie } from 'cookies-next';
import crypto from 'crypto';
import AppModal from '../components/appModal.jsx';
import { deleteCookie } from 'cookies-next';
import { useCookie } from 'react-cookie';

const Mypage = ({ appList, cemail }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [myAppList, setmyAppList] = useState(appList);
	const [name, setName] = useState('');
	const [gender, setGender] = useState('');
	const [age, setAge] = useState('');
	const [addr, setAddr] = useState('');
	const [mobile, setMobile] = useState('');
	const [password, setPassword] = useState('');
	const [pwCheck, setPwCheck] = useState(false); //뒤에 비밀번호 수정
	const [pwdCheck, setPwdCheck] = useState(''); //첫번째 비밀번호입력란
	const [loading, setLoading] = useState(''); //로딩바


	const [email, setEmail] = useState(cemail);
	const [hashId, setHashId] = useState("");

	const getAddress = (e) => {
		setAddr(e.target.value);
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

	// const createApp = () => {
	// 	location.href = `${frontend}/appRegi`;
	// };



	const getMyApp = async () => {
		const response = await axios.post(`${backend}/oauth/app/getMyApp`, {
			email: cemail,
		});

		setmyAppList(response.data.myapp);
	};

	const showAppList = myAppList?.map((v, k) => {
		return (
			<Box p="5%" key={k}>
				<Flex justifyContent={"space-around"}>
					<Text px="5%">
						<Link
							href={{ pathname: `/appinfo`, query: { appName: v.appName } }}
						>
							{v.appName}
						</Link>
					</Text>
					<Text>{v.restAPI}</Text>
				</Flex>
			</Box>
		);
	});

	// const getUser = async () => {
	// 	let userInfo;
	// 	const Cookie = getCookie('user');

	// 	if (Cookie) {
	// 		userInfo = JSON.parse(Buffer.from(Cookie, 'base64').toString('utf-8'));
	// 	}

	// 	setEmail(userInfo.email);
	// 	setHashId(userInfo.hashId);
	// };

	const getUserInfo = async () => {
		let userInfo;

		const Cookie = getCookie("user");

		if (Cookie) {
			userInfo = JSON.parse(Buffer.from(Cookie, "base64").toString("utf-8"));
		}

		const response = await axios.post(
			"http://localhost:8000/Oauth/user/searchUser",
			{ hashId: userInfo.hashId }
		);

		setName(response.data.name);
		setAddr(response.data.addr);
		setAge(response.data.age);
		setMobile(response.data.mobile);
		setGender(response.data.gender);
		setEmail(userInfo.email);
		setHashId(userInfo.hashId);
	};

	const setPwdCheckfunction = (e) => {
		setPwdCheck(e.target.value); //값을 입력받기위해서 만든함수
	};

	//버튼눌렀을떄 업데이트해주려고
	const checkPwdfunction = () => {
		const userHash = email + pwdCheck;

		const Hash = crypto.createHash("sha256").update(userHash).digest("base64");

		if (hashId === Hash) {
			setPwCheck(true); //true
			getUserInfo();
		} else {
			alert("비밀번호가 일치하지 않습니다.");
		}
	};


	//	비밀번호...수정
	const updatePassword = async (e) => {
		const newPassword = setPwdCheck(e.target.value)
		const body = {
			hashId, email, newPassword
		}
		console.log(newPassword)
		const userHash = email + newPassword
		const Hash = crypto.createHash("sha256").update(userHash).digest("base64");

		if (hashId === Hash) {
			setPwCheck(true); //true

		} else {
			alert("비밀번호가 일치하지 않습니다")
		}


		console.log(body)
		const response = await axios.post(
			"http://localhost:8000/Oauth/user/upDatePassword", body
		)

		console.log(response.data.newPassword)

		console.log(response.data.newPassword);
		if (response.data.status == true) {
			setPassword(response.data.newPassword)
			alert(response.data.msg);

			window.location.replace("/");

		}
		else {
			alert(response.data.msg);
		}
	}

	const updateUser = async () => {
		const body = {
			gender,
			name,
			age,
			addr,
			mobile,
			email,
			hashId,
		};

		const response = await axios.post(
			"http://localhost:8000/Oauth/user/upDateUser",
			body
		);

		if (response.data.status == true) {
			setName(response.data.name);
			setAge(response.data.age);
			setGender(response.data.gender);
			setAddr(response.data.addr);
			setMobile(response.data.mobile);
			alert(response.data.msg);
		} else {
			alert(response.data.msg);
		}
	};

	const deleteUser = async (req, res) => {
		const response = await axios.post(
			"http://localhost:8000/oauth/user/deleteUser",
			{ hashId }
		);

		if (response.data.status) {
			deleteCookie("user", { req, res, maxAge: 60 * 60 * 24 * 1000 });

			alert(response.data.msg);
			window.location.replace("/");
		} else {
			alert(response.data.msg);
		}
	};

	useEffect(() => {
		getUserInfo();
	}, [isOpen]);

	const closeAndUpdate = () => {
		onClose();
		getMyApp();
	};

	return (
		<Center w="100%">
			<Box w="40%" m="0 5%" h="20rem" mx="auto" bg="red" pt="5rem">
				<Flex mx="auto" my="0" justifyContent={"center"} mb="10%">
					<Box w="40%" mx="auto" my="0">
						<Text>어플리케이션 등록</Text>
						<Button onClick={onOpen}>어플리케이션 생성</Button>
						<AppModal isOpen={isOpen} onClose={closeAndUpdate} email={email} />
					</Box>
				</Flex>
				<Flex>
					<Box mx="auto" my="0" justifyContent={"center"}>
						<Text>내 어플리케이션</Text>

						<Box>{showAppList}</Box>
					</Box>
				</Flex>
			</Box>
			<Box w="40%" m="0 5%" h="20rem" pt="5rem">
				{pwCheck === false ? (
					<>
						<Center>
							<Box w="100%">
								<Text textAlign={"center"} fontSize={"200%"} mb="2rem">
									{" "}
									회원정보
								</Text>
							</Box>
						</Center>

						<Divider />
						<Text fontSize={"130%"} mt="2rem" mb="1rem">
							{" "}
							비밀번호 입력
						</Text>
						<Input
							type="password"
							placeholder="패스워드를 입력해주세요"
							id="password"
							size="md"
							onChange={setPwdCheckfunction}
						/>

						<Center>
							<Button
								colorScheme="yellow"
								mb="2rem"
								variant="outline"
								mt="2rem"
								onClick={checkPwdfunction}
							>
								{" "}
								확인
							</Button>
						</Center>
						<Center>
							<Button
								onClick={(req, res) => {
									deleteCookie('user', { req, res, maxAge: 60 * 60 * 24 * 1000 });
									//        setIsLogin(false);
									window.location.replace('/');
								}}
								colorScheme="yellow"
								variant="outline"
							>
								LOGOUT
							</Button>

						</Center>
					</>




				) : (
					<>
						<FormControl mt="3">
							<Text fontSize={"180%"} px="35%">
								회원정보수정
							</Text>
							<FormLabel fontSize={"140%"} px="2%" mb="3%">
								이메일
							</FormLabel>
							<Flex justifyContent={"center"}>
								<Input
									type="text"
									placeholder="email을 입력해주세요"
									id="userEmail"
									value={email}
									size="md"
									mb="5%"
									disabled
								/>
							</Flex>

							<FormLabel fontSize={"140%"} px="2%">
								이름
							</FormLabel>
							<Input
								type="text"
								placeholder="이름을 입력해주세요"
								size="md"
								mb="5%"
								value={name}
								onChange={getName}
							/>

							<FormLabel fontSize={"140%"} px="2%" mb="2%">
								성별
							</FormLabel>
							<RadioGroup
								fontSize={"140%"}
								mb="5%"
								px="3%"
								onClick={(e) => {
									if (e.target.value) {
										setGender(e.target.value);
									}
								}}
								defaultValue={gender === "m" ? "m" : "f"}
							>
								<Stack direction="row">
									<Radio value="m" mr="2%">
										남자
									</Radio>
									<Radio value="f">여자</Radio>
								</Stack>
							</RadioGroup>

							<FormLabel fontSize={"140%"} px="2%">
								나이
							</FormLabel>
							<Input
								placeholder="나이를 입력해주세요"
								mb="5%"
								size="md"
								value={age}
								onChange={getAge}
							/>

							<FormLabel fontSize={"140%"} px="2%">
								주소
							</FormLabel>
							<Input
								type="text"
								mb="5%"
								size="md"
								placeholder="주소를 입력해주세요"
								value={addr}
								onChange={getAddress}
							/>

							<FormLabel fontSize={"140%"} px="2%">
								전화번호
							</FormLabel>
							<Input
								type="mobile"
								mb="5%"
								size="md"
								placeholder="전화번호를 입력해주세요"
								value={mobile}
								onChange={getMobile}
							/>
						</FormControl>
						<Center>
							<Button
								colorScheme="yellow"
								mb="2rem"
								variant="outline"
								onClick={updateUser}
							>
								변경하기
							</Button>
						</Center>
						<Divider />

						<Text fontSize={"180%"} px="35%" pt="4rem">
							비밀 번호 수정
						</Text>

						<FormLabel fontSize={"140%"} px="2%" pt="2rem">
							변경 할 비밀번호
						</FormLabel>
						<Input
							type="password"
							placeholder="패스워드를 입력해주세요"
							id="password"
							size="md"
						/>
						<FormLabel fontSize={"140%"} px="2%" pt="2rem">
							비밀번호 확인
						</FormLabel>
						<Input
							type="password"
							placeholder="패스워드를 입력해주세요"
							id="password"
							size="md"
						/>
						<Center>
							<Button
								colorScheme="yellow"
								mb="2rem"
								mt="2rem"
								variant="outline"
								onClick={updatePassword}
							>
								변경하기
							</Button>
						</Center>

						<Divider />
						<Text fontSize={"180%"} px="35%" pt="4rem" textAlign={"center"}>
							{" "}
							회원 탈퇴{" "}
						</Text>

						<Center>
							<Button
								colorScheme="yellow"
								mb="2rem"
								variant="outline"
								mt="2rem"
								onClick={deleteUser}
							>
								{" "}
								회원탈퇴버튼
							</Button>
						</Center>
					</>
				)}
			</Box>
		</Center>
	);
};
export const getServerSideProps = async (ctx) => {
	const cookie = ctx.req ? ctx.req.headers.cookie : "";
	const encodedCookie = cookie.split("=")[1];
	// 이 방법은 쿠키가 여러 개일 경우 에러가 발생해 그 경우엔 코드를 수정해야 합니다. 일단 보류
	const email = JSON.parse(
		Buffer.from(encodedCookie, "base64").toString("utf-8")
	).email;

	console.log(email);
	const response = await axios.post(`${backend}/oauth/app/getMyApp`, {
		email: email,
	});

	return { props: { appList: response.data.myapp } };
};

export default Mypage;
