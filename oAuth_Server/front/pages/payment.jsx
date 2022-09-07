import { Box, Center, Text, Button, Flex, Checkbox, Divider, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const payment = () => {
	const [payMenu, setPayMenu] = useState([
		{ restAPI: '1111', appName: 'A', point: '100' },
		{ restAPI: '2222', appName: 'B', point: '200' },
		{ restAPI: '3333', appName: 'C', point: '300' },
		{ restAPI: '4444', appName: 'D', point: '400' },
		{ restAPI: '5555', appName: 'E', point: '500' },
	]);
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
						{v.appName}
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

	// axios 날려서 Token 받아올 함수
	const Pay = async () => {
		console.log(payPoint);
		// const response = await axios.post('http://localhost:8000/',payPoint)
		// console.log(response.data);
	};

	// 최초 페이지 렌더될때 각 사이트별 포인트 정보 가져올 함수
	useEffect(() => {
		// async () => {
		// 	const response = await axios.post('http://localhost:8000/');
		// 	console.log(response.data);
		// 	setPayMenu(response.data);
		// };
		console.log('axios 요청 보내서 DID 등록되어 있는 사이트 정보 가져오기 ');
	}, [payMenu]);

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
