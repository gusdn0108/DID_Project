import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  const [cemail, setEmail] = useState(undefined);
  const [chashId, setHashId] = useState(undefined);

  let userEmail = '';
  let userHash = '';
  let userInfo;

  const user = getCookie('user');
  if (user) {
    userEmail = JSON.parse(Buffer.from(user, 'base64').toString('utf-8')).email;
    userHash = JSON.parse(Buffer.from(user, 'base64').toString('utf-8')).hashId;
    userInfo = JSON.parse(Buffer.from(user, 'base64').toString('utf-8'));
  }

  useEffect(() => {
    setEmail(userEmail);
    setHashId(userHash);
  }, []);

  return (
    <ChakraProvider>
      <Component {...pageProps} email={cemail} hashId={chashId} user={userInfo} />
    </ChakraProvider>
  );
}

export default MyApp;
