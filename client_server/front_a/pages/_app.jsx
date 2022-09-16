import { ChakraProvider } from '@chakra-ui/react';
import Header from '../components/HeaderTemplate.jsx';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(undefined);

  let userInfo;
  let didUserInfo;

  if (getCookie('userInfo_A')) {
    userInfo = JSON.parse(Buffer.from(getCookie('userInfo_A'), 'base64').toString('utf-8'));
  } else if (getCookie('accessToken')) {
    didUserInfo = JSON.parse(Buffer.from(getCookie('accessToken'), 'base64').toString('utf-8'));
  }

  useEffect(() => {
    if (user === {}) {
      setUser(userInfo);
    }
  }, [user]);

  return (
    <ChakraProvider>
      <Header user={userInfo} did={didUserInfo} />
      <Component {...pageProps} user={userInfo} did={didUserInfo} />
    </ChakraProvider>
  );
}

export default MyApp;
