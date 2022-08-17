import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout.jsx'

import wrapper from '../store/useStore.jsx'
import { Provider } from 'react-redux';
import {useState, useEffect } from 'react';

import { CookiesProvider, useCookies } from 'react-cookie';
import Cookie from 'js-cookie';
import cookie from 'cookie'

import { getCookie, setCookie } from 'cookies-next'

function MyApp({ Component, pageProps, initialUserid }) {
  const [cookies, setCookie, removeCookie ] = useCookies(['userId'])
  const [ userId, setUserid ] = useState(undefined)

  const asdf = getCookie('userId')

  useEffect(() => {
      setUserid(asdf) 
  },[asdf])

  return (
    <CookiesProvider>
      <ChakraProvider>
        <Layout m='2'>
        <Component {...pageProps} userId={asdf} />
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
//     initialUserid: cookies.userId
//   }
// }

export default MyApp;
//export default wrapper.withRedux(MyApp);
