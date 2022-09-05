import { Box, Center, Text, Flex, Checkbox, Divider, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const payment = () => {
	const [payMenu, setPayMenu] = useState([]);
	const [payPoint, setPayPoint] = useState({});
	const [usePoint, setUsePoint] = useState([]);

	const usedPay = (v, i) => {
		setPayPoint({ ...payPoint, [i]: v });
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

	useEffect(() => {
		console.log('axios 요청 보내서 DID 등록되어 있는 사이트 정보 가져오기 ');
	}, [payMenu]);

	return (
		<Box w='50%' h='100%' m='0 25%' mt='2rem'>
			<Center border='1px solid gray'>
				<Text fontSize='2rem' fontWeight='semibold'>
					OAuth 결제 모듈
				</Text>
			</Center>
			<Text fontSize='1.5rem' fontWeight='semibold' textAlign='center' mt='1rem'>
				구매 상품 정보
			</Text>
			<Center w='100%' mt='1rem' textAlign='center'>
				<Text pr='0.5rem'>판매자 :</Text>
				<Text>나중에 사이트명 가져오기</Text>
			</Center>
			<Center w='100%' mt='1rem' textAlign='center'>
				<Text pr='0.5rem'>상품명 :</Text>
				<Text>나중에 상품명 가져오기</Text>
			</Center>
			<Text fontSize='1.5rem' fontWeight='semibold' textAlign='center' mt='1rem'>
				사용할 수 있는 포인트
			</Text>
			<Divider mt='1rem' />
			<Center w='100%' h='20%' mt='1rem'>
				<Flex direction='column' w='100%'>
					<Flex w='100%' mt='1rem' border='1px solid #000'>
						<Center w='15%' h='3rem'>
							A
						</Center>
						<Center w='80%' h='3rem' borderLeft='1px solid #000'>
							<Text w='50%' h='3rem' pl='1rem' pt='0.7rem' fontSize='1rem' borderRight='1px solid #000'>
								보유 Point : 나중에 각 포인트 가져오기
							</Text>
							<Text pl='1rem'>사용 Point :</Text>
							<NumberInput w='25%' min={0} max={10000} ml='1rem' onChange={(valueAsNumber) => usedPay(valueAsNumber, 0)}>
								<NumberInputField />
							</NumberInput>
						</Center>
						<Checkbox w='8%' colorScheme='green' onChange={() => checkedBox(0)}>
							사용
						</Checkbox>
					</Flex>
					<Flex w='100%' mt='1rem' border='1px solid #000'>
						<Center w='15%' h='3rem'>
							B
						</Center>
						<Center w='80%' h='3rem' borderLeft='1px solid #000'>
							<Text w='50%' h='3rem' pl='1rem' pt='0.7rem' fontSize='1rem' borderRight='1px solid #000'>
								보유 Point : 나중에 각 포인트 가져오기
							</Text>
							<Text pl='1rem'>사용 Point :</Text>
							<NumberInput w='25%' min={0} max={10000} ml='1rem' onChange={(valueAsNumber) => usedPay(valueAsNumber, 1)}>
								<NumberInputField />
							</NumberInput>
						</Center>
						<Checkbox w='8%' colorScheme='green' onChange={() => checkedBox(1)}>
							사용
						</Checkbox>
					</Flex>
					<Flex w='100%' mt='1rem' border='1px solid #000'>
						<Center w='15%' h='3rem'>
							C
						</Center>
						<Center w='80%' h='3rem' borderLeft='1px solid #000'>
							<Text w='50%' h='3rem' pl='1rem' pt='0.7rem' fontSize='1rem' borderRight='1px solid #000'>
								보유 Point : 나중에 각 포인트 가져오기
							</Text>
							<Text pl='1rem'>사용 Point :</Text>
							<NumberInput w='25%' min={0} max={10000} ml='1rem' onChange={(valueAsNumber) => usedPay(valueAsNumber, 2)}>
								<NumberInputField />
							</NumberInput>
						</Center>
						<Checkbox w='8%' colorScheme='green' onChange={() => checkedBox(2)}>
							사용
						</Checkbox>
					</Flex>
					<Flex w='100%' mt='1rem' border='1px solid #000'>
						<Center w='15%' h='3rem'>
							D
						</Center>
						<Center w='80%' h='3rem' borderLeft='1px solid #000'>
							<Text w='50%' h='3rem' pl='1rem' pt='0.7rem' fontSize='1rem' borderRight='1px solid #000'>
								보유 Point : 나중에 각 포인트 가져오기
							</Text>
							<Text pl='1rem'>사용 Point :</Text>
							<NumberInput w='25%' min={0} max={10000} ml='1rem' onChange={(valueAsNumber) => usedPay(valueAsNumber, 3)}>
								<NumberInputField />
							</NumberInput>
						</Center>
						<Checkbox w='8%' colorScheme='green' onChange={() => checkedBox(3)}>
							사용
						</Checkbox>
					</Flex>
					<Flex w='100%' mt='1rem' border='1px solid #000'>
						<Center w='15%' h='3rem'>
							E
						</Center>
						<Center w='80%' h='3rem' borderLeft='1px solid #000'>
							<Text w='50%' h='3rem' pl='1rem' pt='0.7rem' fontSize='1rem' borderRight='1px solid #000'>
								보유 Point : 나중에 각 포인트 가져오기
							</Text>
							<Text pl='1rem'>사용 Point :</Text>
							<NumberInput w='25%' min={0} max={10000} ml='1rem' onChange={(valueAsNumber) => usedPay(valueAsNumber, 4)}>
								<NumberInputField />
							</NumberInput>
						</Center>
						<Checkbox w='8%' colorScheme='green' onChange={() => checkedBox(4)}>
							사용
						</Checkbox>
					</Flex>
					<Divider mt='2rem' />
				</Flex>
			</Center>
			<Center mt='1rem'>
				<Text fontSize='1.5rem'>구매하기</Text>
			</Center>
			<Center w='100%' h='7rem' mt='1rem'>
				<Box w='50%' h='100%' pl='2rem'>
					<Text fontSize='1.2rem'>상품 가격 : 나중에 상품가격 가져오기 </Text>
				</Box>
				<Box w='50%' h='100%' pl='2rem'>
					<Text fontSize='1.2rem'>결제 Point : {totalPayPrice()}</Text>
				</Box>
			</Center>
		</Box>
	);
};

export default payment;
