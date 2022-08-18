import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout.jsx'

import { useState, useEffect } from 'react';

import { CookiesProvider } from 'react-cookie';
import { getCookie } from 'cookies-next'

function MyApp({ Component, pageProps }) {
  // const [cookies, setCookie, removeCookie ] = useCookies(['loginInfo'])
  const [ userId, setUserid ] = useState(undefined)
  const [ email, setEmail ] = useState(undefined)
  const [mobile, setMobile ] = useState(undefined)

  const userCookie = getCookie('loginInfo');
  let userName = ''
  let userEmail= ''
  let userMobile = ''

  if(userCookie) {
    userName = JSON.parse(Buffer.from(userCookie, 'base64').toString('utf-8')).username
    userEmail = JSON.parse(Buffer.from(userCookie, 'base64').toString('utf-8')).email
    userMobile = JSON.parse(Buffer.from(userCookie, 'base64').toString('utf-8')).mobile
  }
  
  useEffect(() => {
      setUserid(userName)
      setEmail(userEmail)
      setMobile(userMobile)
  },[])

  return (
    <CookiesProvider>
      <ChakraProvider>
        <Layout m='2' userId={userId}>
        <Component {...pageProps} userId={userId} email={email} mobile={mobile}/>
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
