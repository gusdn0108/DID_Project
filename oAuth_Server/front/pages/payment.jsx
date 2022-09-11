import { Box, Center, Text, Button, Flex, Checkbox, Divider, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { setCookie } from 'cookies-next';

const payment = () => {
	const [payMenu, setPayMenu] = useState([]);
	const [payPoint, setPayPoint] = useState({});
	const [usePoint, setUsePoint] = useState([]);

	const usedPay = (v, i) => {
		setPayPoint({ ...payPoint, [i]: v });
	};

	const showList = () => {
		return payMenu.map((v, k) => {
			return (
				<Flex w='100%' mt='1rem' border='1px solid #000' key={k}>
					<Center w='15%' h='3rem'>
						{v.restAPI}
					</Center>
					<Center w='80%' h='3rem' borderLeft='1px solid #000'>
						<Text w='50%' h='3rem' pl='1rem' pt='0.7rem' fontSize='1rem' borderRight='1px solid #000'>
							보유 Point : {v.point}
						</Text>
						<Text pl='1rem'>사용 Point :</Text>
						<NumberInput w='25%' min={0} max={v.point} ml='1rem' onChange={(valueAsNumber) => usedPay(valueAsNumber, v.restAPI)}>
							<NumberInputField />
						</NumberInput>
					</Center>
					<Checkbox w='8%' colorScheme='green' onChange={() => checkedBox(v.restAPI)}>
						사용
					</Checkbox>
				</Flex>
			);
		});
	};

	const totalPayPrice = () => {
		let point = 0;
		usePoint.map((v) => {
			if (payPoint[v] !== undefined) point += Number(payPoint[v]);
		});
		return point;
	};

	const checkedBox = (i) => {
		if (usePoint.includes(i)) {
			let arr = usePoint.filter((e) => e !== i);
			setUsePoint(arr);
		} else {
			setUsePoint([...usePoint, i]);
		}
	};

	const getPoint = async () => {
		const email = window.location.search.split('=')[1];
		const response = await axios.post('http://localhost:8000/Oauth/point/checkPoint', { email });
		if (!response.data.isError) {
			setPayMenu(response.data.value);
		} else {
			alert('포인트 정보를 불러오는데 실패하였습니다 다시 시도하여 주십시오.');
		}
	};

	// axios 날려서 Token 받아올 함수
	const Pay = async (req, res) => {
		const response = await axios.post('http://localhost:8000/Oauth/point/sendToken', { pointInfo: payPoint });
		document.domain = 'localhost';
		setCookie('item', response.data.value, { req, res, maxAge: 60 * 60 * 24 * 1000 });
		opener.location.reload();
		window.self.close();
	};

	// 최초 페이지 렌더될때 각 사이트별 포인트 정보 가져올 함수
	useEffect(() => {
		getPoint();
	}, []);

	return (
		<Box w='90%' h='100%' m='0 5%' mt='2rem'>
			<Center border='1px solid gray'>
				<Text fontSize='2rem' fontWeight='semibold'>
					OAuth 결제 모듈
				</Text>
			</Center>
			<Text fontSize='1.5rem' fontWeight='semibold' textAlign='center' mt='1rem'>
				사용할 수 있는 포인트
			</Text>
			<Text className='emailText'></Text>
			<Divider mt='1rem' />
			<Center w='100%' h='20%' mt='1rem'>
				<Flex direction='column' w='100%'>
					{showList()}
					<Divider mt='2rem' />
				</Flex>
			</Center>
			<Center mt='1rem'>
				<Text fontSize='1.5rem'>구매하기</Text>
			</Center>
			<Center w='100%' h='7rem'>
				<Center>
					<Text fontSize='1.2rem'>결제 Point : {totalPayPrice()}</Text>
					<Button ml='2rem' onClick={Pay}>
						적용하기
					</Button>
				</Center>
				{/* </Box> */}
			</Center>
		</Box>
	);
};

export default payment;
