import useWeb3 from '../hooks/useWeb3';
import { ChakraProvider } from '@chakra-ui/react';
import HeaderTemplate from '../components/HeaderTemplate.jsx';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

function App({ Component, pageProps }) {
  const [web3, account] = useWeb3(undefined);
  const [user, setUser] = useState(undefined);

  const Cookie = getCookie('user');

  let userInfo;

  if (Cookie) {
    userInfo = JSON.parse(Buffer.from(Cookie, 'base64').toString('utf-8'));
  }

  useEffect(() => {
    if (user === undefined) {
      setUser(userInfo);
    }
  });

  if (!account) return <>메타마스크 연결이 필요합니다.</>;

  return (
    <ChakraProvider>
      <HeaderTemplate user={user} />
      <Component {...pageProps} user={user} />
    </ChakraProvider>
  );
}

export default App;
