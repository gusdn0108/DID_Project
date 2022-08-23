import { Center, Box, Badge, Stack, Text, Flex, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Divider } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const BuyItemModal = ({ bookInfo }) => {
	console.log(bookInfo);

	const { isOpen, onOpen, onClose } = useDisclosure();

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
											보유중인 포인트 : ???
										</Text>
										<Button w='14rem' mt='0.5rem' mb='0.5rem' colorScheme='yellow' variant='outline' ml='19rem'>
											구매하기
										</Button>
									</Box>
								</Box>
								<Box w='100%' h='12rem'>
									<Flex>
										<Box w='33%' h='12rem'>
											<Text textAlign='center' fontSize='1.2rem' fontWeight='semibold'>
												A 사이트 포인트 사용
											</Text>
											<Text textAlign='center' fontSize='1.2rem' fontWeight='semibold' mt='5rem'>
												보유 포인트 : ????
											</Text>
											<Button w='10rem' mt='0.5rem' mb='0.5rem' colorScheme='yellow' variant='outline' ml='0.8rem'>
												구매하기
											</Button>
										</Box>
										<Box w='33%' h='12rem'>
											<Text textAlign='center' fontSize='1.2rem' fontWeight='semibold'>
												B 사이트 포인트 사용
											</Text>
											<Text textAlign='center' fontSize='1.2rem' fontWeight='semibold' mt='5rem'>
												보유 포인트 : ????
											</Text>
											<Button w='10rem' mt='0.5rem' mb='0.5rem' colorScheme='yellow' variant='outline' ml='0.8rem'>
												구매하기
											</Button>
										</Box>
										<Box w='33%' h='12rem'>
											<Text textAlign='center' fontSize='1.2rem' fontWeight='semibold'>
												C 사이트 포인트 사용
											</Text>
											<Text textAlign='center' fontSize='1.2rem' fontWeight='semibold' mt='5rem'>
												보유 포인트 : ????
											</Text>
											<Button w='10rem' mt='0.5rem' mb='0.5rem' colorScheme='yellow' variant='outline' ml='0.8rem'>
												구매하기
											</Button>
										</Box>
									</Flex>
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
