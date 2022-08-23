import styled from 'styled-components';
import { Box, Text, Button, Center, Image, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const images = [{ imageURL: '	https://image.yes24.com/images/00_Event/2022/0727Store/bn_959x421.jpg' }, { imageURL: 'https://image.yes24.com/images/00_Event/2020/1109Used/bn_PC_Big_959x421.jpg' }, { imageURL: 'https://image.yes24.com/images/01_Banner/welcome/BigBn/YES24_Banner_PC_Big_used_200323_10_959x421.jpg' }, { imageURL: 'https://image.yes24.com/images/00_Event/2022/0816BuyBack/bn_959x421.jpg' }, { imageURL: 'https://image.yes24.com/images/00_Event/2022/0818Super/bn_959x421.jpg' }];
const text = ['편의점 택배', '중고 외서 특가전', '중고샵 할인혜택', '금주의 바이백', '중고책 슈퍼특가'];

const MainCarousel = () => {
	const [slide, setSlide] = useState(0);

	const trans = {
		transform: `translateX(${slide * -80}rem)`,
	};

	const btnHandler = (i) => {
		setSlide(i);
	};

	const Items = () => {
		return images.map((v, k) => {
			return (
				<>
					<Box key={k} borderBottom='0.05rem solid #000'>
						<Image src={v.imageURL} minW='80rem' h='30rem' />
					</Box>
				</>
			);
		});
	};

	return (
		<>
			<Box>
				<Flex>
					<Carousel style={trans}>
						<Slider>{Items()}</Slider>
					</Carousel>
				</Flex>
			</Box>
			<Box w='100%' mt='30.2rem' position='relative'>
				<Center>
					<Flex w='100%' h='3rem'>
						<Button flex='1' h='3rem' colorScheme='yellow' variant='outline' ml='0.4rem' mr='0.2rem' onClick={() => btnHandler(0)}>
							편의점 택배
						</Button>
						<Button flex='1' h='3rem' colorScheme='yellow' variant='outline' m='0 0.2rem' onClick={() => btnHandler(1)}>
							중고 외서 특가전
						</Button>
						<Button flex='1' h='3rem' colorScheme='yellow' variant='outline' m='0 0.2rem' onClick={() => btnHandler(2)}>
							중고샵 할인혜택
						</Button>
						<Button flex='1' h='3rem' colorScheme='yellow' variant='outline' m='0 0.2rem' onClick={() => btnHandler(3)}>
							금주의 바이백
						</Button>
						<Button flex='1' h='3rem' colorScheme='yellow' variant='outline' ml='0.2rem' mr='0.4rem' onClick={() => btnHandler(4)}>
							중고책 슈퍼특가
						</Button>
					</Flex>
				</Center>
			</Box>
		</>
	);
};

export default MainCarousel;

const Carousel = styled.div`
	width: 100%;
	position: absolute;
	transition: all 1s;
	z-index: 0;
`;

const Slider = styled.div`
	width: 200rem;
	display: flex;
`;
