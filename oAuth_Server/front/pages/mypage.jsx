import {
	Box,
	Button,
	Flex,
	Text,
	useDisclosure,
	Center,
	FormLabel,
	FormControl,
	FormHelperText,
	Radio,
	Stack,
	Input,
	Select,
	RadioGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { backend, frontend } from "../utils/ip.js";

import AppModal from "../components/appModal.jsx";
import Link from "next/link.js";

// 사용자는 마이 페이지에서 자신이 운영하는 서비스를 연동 등록 가능
// 내가 연동한 어플리케이션을 보여주는 리스트도 만들자..
// 발급 받기 > 연동할 어플리케이션 이름을 입력하면 rest api, secret등을 준다.

// rest api를 발급받고 redirect uri를 발급받을 로컬 서버 관리자는
// 로그인이 된 상태라고 가정

const Mypage = ({ appList }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [myAppList, setmyAppList] = useState(appList);

	const createApp = () => {
		location.href = `${frontend}/appRegi`;
	};

	const getMyApp = async () => {
		const email = "619049@naver.com";
		const response = await axios.post(`${backend}/api/oauth/getMyApp`, {
			email: email,
		});

		setmyAppList(response.data.myapp);
	};

	const showAppList = myAppList.map((v, k) => {
		return (
			<Box p="5%" key={k}>
				<Flex justifyContent={"space-around"}>
					<Text px="5%">
						<Link
							href={{
								pathname: `/appinfo`,
								query: { appName: v.appName },
							}}
						>
							{v.appName}
						</Link>
					</Text>
					<Text>{v.restAPI}</Text>
				</Flex>
			</Box>
		);
	});

	useEffect(() => {
		getMyApp();
	}, [isOpen]);

	return (
		<Center w="100%">
			<Box w="40%" m="0 5%" h="20rem" mx="auto" bg="red" pt="5rem">
				<Flex mx="auto" my="0" justifyContent={"center"} mb="10%">
					<Box w="40%" mx="auto" my="0">
						<Text>어플리케이션 등록</Text>
						<Button onClick={onOpen}>어플리케이션 생성</Button>
						<AppModal isOpen={isOpen} onClose={onClose} />
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
				<FormControl mt="3">
					<FormLabel fontSize={"140%"} px="2%" mb="3%">
						이메일
					</FormLabel>
					<Flex justifyContent={"center"}>
						<Input
							type="text"
							placeholder="email을 입력해주세요"
							id="userEmail"
							size="md"
							mb="5%"
						/>

						<Select
							placeholder="Select Domain"
							size="md"
							id="domainSelector"
						>
							<option value="@kakao.com">@kakao.com</option>
							<option value="@naver.com">@naver.com</option>
							<option value="@gmail.com">@gmail.com</option>
						</Select>
					</Flex>

					<FormLabel fontSize={"140%"} px="2%">
						이름
					</FormLabel>
					<Input
						type="text"
						placeholder="이름을 입력해주세요"
						size="md"
						mb="5%"
					/>

					<FormLabel fontSize={"140%"} px="2%" mb="2%">
						성별
					</FormLabel>
					<RadioGroup fontSize={"140%"} mb="5%" px="3%">
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
					/>

					<FormLabel fontSize={"140%"} px="2%">
						주소
					</FormLabel>
					<Input
						mb="5%"
						size="md"
						placeholder="주소를 입력해주세요"
					/>

					<FormLabel fontSize={"140%"} px="2%">
						전화번호
					</FormLabel>
					<Input
						mb="5%"
						size="md"
						placeholder="전화번호를 입력해주세요"
					/>

					<FormLabel fontSize={"140%"} px="2%">
						비밀번호
					</FormLabel>
					<Input
						type="password"
						placeholder="패스워드를 입력해주세요"
						id="password"
						size="md"
					/>
					<FormHelperText mb="7%" px="2%"></FormHelperText>
				</FormControl>
			</Box>
		</Center>
	);
};

export const getServerSideProps = async () => {
	const email = "619049@naver.com";
	const response = await axios.post(`${backend}/api/oauth/getMyApp`, {
		email: email,
	});

	return { props: { appList: response.data.myapp } };
};

export default Mypage;
