import { Center, Box, Badge, Stack, Text, Flex, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Divider } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';

const BuyItemModal = ({ bookInfo, user }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [login, setLogin] = useState(false);
	const [point, setPoint] = useState(0);

	const [did, setDid] = useState(false);
	const [token, setToken] = useState(false);
	const [tokenData, setTokenData] = useState('');

	const buyItem = async () => {
		const response = await axios.post('http://localhost:4003/api/auth/usePoint', { email: user.email, price: bookInfo.formattedPrice });
		if (response.data.status) {
			getPoint();
			alert('구매 완료되었습니다');
			location.href = 'http://localhost:3003';
		} else {
			alert('구매에 실패하였습니다.');
		}
	};

	const getPoint = async () => {
		const response = await axios.post('http://localhost:4003/api/auth/pointInquiry', { email: user.email });
		if (response.data.status) {
			setPoint(response.data.point);
		}
	};

	// OAuth의 페이지 요청하는 함수
	const getPage = () => {
		document.domain = 'localhost';
		window.open(`http://localhost:8080/payment?email=${user.email}&point=${bookInfo.formattedPrice}`, '', 'width=800, height=600');
	};

	// OAuth에 포인트를 차감 요청할 함수
	const didBuyItem = async (req, res) => {
		const Cookie = getCookie('item');

		const payPoint = JSON.parse(Buffer.from(Cookie.split('.')[1], 'base64').toString('utf-8')).pointInfo;

		const response = await axios.post('http://localhost:8000/Oauth/point/usePoint', {
			token: Cookie,
			payPoint,
		});

		if (!response.data.isError) {
			alert(response.data.value);
			deleteCookie('item', { req, res, maxAge: 60 * 60 * 24 * 1000 });
			window.location.reload();
		} else {
			alert(response.data.error);
		}
	};

	const showUsePoint = () => {
		let point = 0;
		Object.entries(tokenData).forEach((v) => {
			point += Number(v[1]);
		});
		return point;
	};

	useEffect(() => {
		if (user) {
			getPoint();
			setLogin(true);
			setDid(true);
		}

		if (!token) {
			if (getCookie('item')) {
				setTokenData(JSON.parse(Buffer.from(getCookie('item').split('.')[1], 'base64').toString('utf-8')).pointInfo);
				setToken(true);
			}
		}
	}, []);

	return (
		<>
			<Button mb='0.5rem' colorScheme='yellow' variant='outline' onClick={onOpen}>
				구매하기
			</Button>

			<Modal onClose={onClose} isOpen={isOpen} isCentered size='6xl'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>구매 페이지</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex>
							<Box w='30%' h='30rem'>
								<Image src={bookInfo.imageUrl} w='100%' h='100%' />
							</Box>
							<Box w='20%' h='30rem' p='5'>
								<Flex direction='column'>
									<Stack w='100%' h='5.5rem'>
										<Text fontWeight='semibold'>제목 : {bookInfo.title}</Text>
										<Box fontWeight='semibold' letterSpacing='wide'>
											장르: {bookInfo.menu}
											{'  '}
											<Badge borderRadius='full' px='2' colorScheme='yellow'>
												{bookInfo.type}
											</Badge>
										</Box>
									</Stack>
									<Divider />
									<Stack w='100%' h='5.5rem' m='1rem 0'>
										<Box display='flex' mt='2' alignItems='center' color='gray.600'>
											별점 -
											{Array(5)
												.fill('')
												.map((_, i) => (
													<StarIcon key={i} color={i < bookInfo.rating ? 'yellow.500' : 'gray.300'} />
												))}
										</Box>
										<Box as='span' ml='2' color='gray.600' fontSize='sm' pt='1rem'>
											리뷰 갯수 : {bookInfo.reviewCount} reviews
										</Box>
									</Stack>
									<Divider />
									<Stack w='100%' h='5.5rem' mt='14rem'>
										<Text>판매가 : {bookInfo.formattedPrice} P </Text>
										<Divider />
									</Stack>
								</Flex>
							</Box>
							<Center height='30rem'>
								<Divider orientation='vertical' />
							</Center>
							<Box w='50%' h='30rem'>
								<Box w='100%' h='18rem'>
									<Text fontWeight='bold' textAlign='center' fontSize='2rem'>
										Kyungli Book 포인트 사용
									</Text>
									<Box w='100%' h='5rem' pt='7rem'>
										<Text fontSize='1.5rem' fontWeight='semibold' textAlign='end' mr='2rem'>
											보유중인 포인트 : {point} P
										</Text>
										<Button w='14rem' mt='0.5rem' mb='0.5rem' colorScheme='yellow' variant='outline' ml='19rem' onClick={buyItem}>
											구매
										</Button>
									</Box>
								</Box>
								<Divider />
								<Box w='100%' h='12rem'>
									{token ? (
										<Box w='100%' h='5rem' pt='7rem'>
											<Text fontSize='1.5rem' fontWeight='semibold' textAlign='right' mr='3.5rem'>
												{user ? `총 사용 포인트 ${showUsePoint()} P` : '로그인 후 이용가능 합니다'}
											</Text>
											<Button w='14rem' mt='0.5rem' mb='0.5rem' colorScheme='yellow' variant='outline' ml='19rem' onClick={didBuyItem}>
												구매
											</Button>
										</Box>
									) : (
										<Box w='100%' h='5rem' pt='7rem'>
											<Text fontSize='1.5rem' fontWeight='semibold' textAlign='right' mr='3.5rem'>
												포인트 조회하기
											</Text>
											<Button w='14rem' mt='0.5rem' mb='0.5rem' colorScheme='yellow' variant='outline' ml='19rem' onClick={getPage}>
												조회
											</Button>
										</Box>
									)}
								</Box>
							</Box>
						</Flex>
					</ModalBody>
					<ModalFooter>
						<Button w='5rem' onClick={onClose}>
							취소
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default BuyItemModal;
