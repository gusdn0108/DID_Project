import HeaderTemplate from './styles/HeaderStyle';
import { Button, Flex, Box, Center, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import MypageDrawer from '../components/MypageDrawer.jsx';

export default function Home() {
	return (
		<>
			<HeaderTemplate>
				<Flex className='header'>
					<Center flex={2} className='logo' h='4rem' fontSize='1.5rem' fontWeight='bold'>
						Kyungil Books
					</Center>
					<Flex className='menu' flex={8}>
						<Center flex='1' h='4rem' fontWeight='bold'>
							<Text>베스트셀러 🏅</Text>
						</Center>
						<Center flex='1' h='4rem' fontWeight='bold'>
							<Text>국내도서 🇰🇷</Text>
						</Center>
						<Center flex='1' h='4rem' fontWeight='bold'>
							<Text>외국도서 🇺🇸</Text>
						</Center>
						<Center flex='1' h='4rem' fontWeight='bold'>
							<Text>추천도서 📓</Text>
						</Center>
						<Center flex='1' h='4rem' fontWeight='bold'>
							<Text>eBook 🖥</Text>
						</Center>
						<Center flex='1' h='4rem' fontWeight='bold'>
							<Text>웹소설 👨🏻‍💻</Text>
						</Center>
						<Center flex='1' h='4rem' fontWeight='bold'>
							<Text>중고도서 📖</Text>
						</Center>
					</Flex>
					<Center flex={1} mr='2rem'>
						<MypageDrawer/>
					</Center>
				</Flex>
			</HeaderTemplate>
		</>
	);
}
