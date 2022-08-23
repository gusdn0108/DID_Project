import { Box, Stack, Center, Flex, Text, Button } from '@chakra-ui/react';
import MainCarousel from '../components/Carousel';
import ItemList from '../components/ItemList';
import { property1, property2, property3, property4 } from '../property';

export default function Home() {
	return (
		<>
			<Center w='100%' h='40rem' mt='-3.3rem'>
				<Box w='15%' h='33.5rem' borderTop='0.05rem solid #000' borderBottom='0.05rem solid #000'>
					<Flex direction='column'>
						<Stack flex={1}>
							<Text pl='1rem' pt='1.615rem' pb='1.615rem' borderBottom='0.05rem solid #000'>
								베스트셀러 🏅
							</Text>
						</Stack>
						<Stack flex={1}>
							<Text pl='1rem' pt='1.615rem' pb='1.615rem' borderBottom='0.05rem solid #000'>
								국내도서 🇰🇷
							</Text>
						</Stack>
						<Stack flex={1}>
							<Text pl='1rem' pt='1.615rem' pb='1.615rem' borderBottom='0.05rem solid #000'>
								외국도서 🇺🇸
							</Text>
						</Stack>
						<Stack flex={1}>
							<Text pl='1rem' pt='1.615rem' pb='1.615rem' borderBottom='0.05rem solid #000'>
								추천도서 📓
							</Text>
						</Stack>
						<Stack flex={1}>
							<Text pl='1rem' pt='1.615rem' pb='1.615rem' borderBottom='0.05rem solid #000'>
								eBook 🖥
							</Text>
						</Stack>
						<Stack flex={1}>
							<Text pl='1rem' pt='1.615rem' pb='1.615rem' borderBottom='0.05rem solid #000'>
								웹소설 👨🏻‍💻
							</Text>
						</Stack>
						<Stack flex={1}>
							<Text pl='1rem' pt='1.615rem' pb='1.615rem' borderBottom='0.05rem solid #000'>
								중고도서 📖
							</Text>
						</Stack>
					</Flex>
				</Box>
				<Box w='85%' h='33.5rem' position='relative' overflow='hidden' border='0.05rem solid #000'>
					<MainCarousel />
				</Box>
			</Center>
			<Center>
				<Box w='80%' h='143.5rem' border='0.05rem solid #000' borderRadius='1rem'>
					<Box w='100%' h='5rem' mt='1rem'>
						<Flex>
							<Button flex={1} h='5rem' colorScheme='yellow' variant='outline' ml='0.4rem' mr='0.2rem'>
								문학/인문
							</Button>
							<Button flex={1} h='5rem' colorScheme='yellow' variant='outline' m='0 0.2rem'>
								경제/교양
							</Button>
							<Button flex={1} h='5rem' colorScheme='yellow' variant='outline' m='0 0.2rem'>
								유아동/실용
							</Button>
							<Button flex={1} h='5rem' colorScheme='yellow' variant='outline' m='0 0.2rem'>
								어학/학습
							</Button>
							<Button flex={1} h='5rem' colorScheme='yellow' variant='outline' ml='0.2rem' mr='0.4rem'>
								중고책
							</Button>
						</Flex>
					</Box>
					<Box w='100%' h='140rem'>
						<Center mt='3rem'>
							<ItemList property={property1} />
						</Center>
						<Center mt='4rem'>
							<ItemList property={property2} />
						</Center>
						<Center mt='4rem'>
							<ItemList property={property3} />
						</Center>
						<Center mt='4rem'>
							<ItemList property={property4} />
						</Center>
					</Box>
				</Box>
			</Center>
		</>
	);
}
