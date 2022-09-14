import HeaderTemplate from './styles/HeaderStyle';
import { Button, Flex, Center, Text, useDisclosure } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import MypageDrawer from './MypageDrawer.jsx';
import JoinModal from './JoinModal.jsx';
import LoginModal from './LoginModal.jsx';
import { deleteCookie } from 'cookies-next';

export default function Home({ user }) {
	const [isLogin, setIsLogin] = useState(false);

	const { isOpen: loginIsOpen, onOpen: loginOnOpen, onClose: loginOnClose } = useDisclosure();
	const { isOpen: joinIsOpen, onOpen: joinOnOpen, onClose: joinOnClose } = useDisclosure();

	useEffect(() => {
		if (user) {
			setIsLogin(true);
		}
	}, []);

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
						{isLogin ? (
							<>
								<Button
									onClick={(req, res) => {
										deleteCookie('user', { req, res, maxAge: 60 * 60 * 24 * 1000 });
										setIsLogin(false);
										window.location.replace('/');
									}}
									colorScheme='yellow'
									variant='outline'
									w='6rem'
									mr='0.5rem'
								>
									LOGOUT
								</Button>
								<MypageDrawer user={user} />
							</>
						) : (
							<>
								<Button onClick={joinOnOpen} colorScheme='yellow' variant='outline' w='5rem' mr='0.5rem'>
									JOIN
								</Button>
								<Button onClick={loginOnOpen} colorScheme='yellow' variant='outline' w='5rem' ml='0.5rem'>
									LOGIN
								</Button>
							</>
						)}
					</Center>
				</Flex>
				<JoinModal joinIsOpen={joinIsOpen} joinOnClose={joinOnClose} />
				<LoginModal loginIsOpen={loginIsOpen} loginOnClose={loginOnClose} />
			</HeaderTemplate>
		</>
	);
}
