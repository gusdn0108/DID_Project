import useWeb3 from '../hooks/useWeb3';
import { ChakraProvider } from '@chakra-ui/react';
import HeaderTemplate from '../components/HeaderTemplate.jsx';

function App({ Component, pageProps }) {
	const [web3, account] = useWeb3();

	if (!account) return <>메타마스크 연결이 필요합니다.</>;

	return (
		<ChakraProvider>
			<HeaderTemplate />
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default App;
