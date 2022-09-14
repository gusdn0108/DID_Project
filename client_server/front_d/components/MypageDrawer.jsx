import { DrawerFooter, Center, Box, Drawer, Badge, Divider, Text, Button, DrawerBody, useDisclosure, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

function SizeExample({ user }) {
	const { email, name } = user;
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [point, setPoint] = useState(0);
	const [did, setDid] = useState(false);

	const handleClick = () => {
		onOpen();
	};

	useEffect(() => {
		(async function () {
			const response = await axios.post('http://localhost:4003/api/auth/pointInquiry', { email });
			if (response.data.status) {
				setPoint(response.data.point);
			}
		})();
	}, []);

	return (
		<>
			<Button w='6rem' colorScheme='yellow' variant='outline' ml='0.5rem' onClick={() => handleClick('sm')}>
				PROFILE
			</Button>

			<Drawer onClose={onClose} isOpen={isOpen} size='sm'>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						<Text fontSize='2rem' fontWeight='semibold' textAlign='center' mt='2rem'>
							WELCOME USER {name} 🥳
						</Text>
						<Divider />
					</DrawerHeader>
					<DrawerBody mt='2rem'>
						<Text fontWeight='bold'> ID : {email}</Text>
						<Text fontWeight='bold' mt='0.2rem'>
							{' '}
							POINT : {point}
						</Text>
						<Text fontWeight='bold' mt='0.2rem'>
							{' '}
							DID 등록 여부 :{' '}
							{did ? (
								<Badge colorScheme='green'>등록</Badge>
							) : (
								<>
									<Badge colorScheme='red'>미등록</Badge>
									<Button ml='1rem' colorScheme='yellow' variant='outline' size='xs'>
										DID 등록하기
									</Button>
								</>
							)}
						</Text>

						<Center mt='1.8rem'>
							<Text fontSize='2rem' fontWeight='bold'>
								TODAY BEST
							</Text>
						</Center>

						<Center>
							<Box minW='10rem' borderWidth='1px' mt='1rem'>
								<Image src='http://image.kyobobook.co.kr/images/book/large/304/l9791155815304.jpg' width={300} height={300} />
								<Box p='6'>
									<Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
										<Badge borderRadius='full' px='2' colorScheme='yellow'>
											BEST
										</Badge>{' '}
										범죄도시2 액션북
									</Box>

									<Box>20400 P</Box>
									<Box mt='2' alignItems='center'>
										{Array(5)
											.fill('')
											.map((_, i) => (
												<StarIcon key={i} color={i < 5 ? 'yellow.500' : 'gray.300'} />
											))}
										<Box as='span' ml='2' color='gray.600' fontSize='sm'>
											1,042 reviews
										</Box>
									</Box>
								</Box>
							</Box>
						</Center>
					</DrawerBody>

					<DrawerFooter>
						<Button colorScheme='yellow' variant='outline' mr={3} onClick={onClose}>
							닫기
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default SizeExample;
