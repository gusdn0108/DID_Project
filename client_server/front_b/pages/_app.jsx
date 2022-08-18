import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout.jsx'

import { useState, useEffect } from 'react';

import { CookiesProvider } from 'react-cookie';
import { getCookie } from 'cookies-next'

function MyApp({ Component, pageProps }) {
  // const [cookies, setCookie, removeCookie ] = useCookies(['loginInfo'])
  const [ userId, setUserid ] = useState(undefined)

  const userCookie = getCookie('loginInfo');
  let userInfo = ''

  if(userCookie) {
    userInfo = JSON.parse(Buffer.from(userCookie, 'base64').toString('utf-8')).username
  }
  
  useEffect(() => {
      setUserid(userInfo)
  },[])

  return (
    <CookiesProvider>
      <ChakraProvider>
        <Layout m='2' userId={userId}>
        <Component {...pageProps} userId={userId}/>
        </Layout>
      </ChakraProvider>
    </CookiesProvider>
  )
}

// MyApp.getInitialProps = ({req}) => {
//   const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
//   // console.log(cookies)
//   //const cookies = cookie.parse(req.headers.cookie)

//   return {
//     initialUserid: cookies.loginInfo
//   }
// }

export default MyApp;
//export default wrapper.withRedux(MyApp);
