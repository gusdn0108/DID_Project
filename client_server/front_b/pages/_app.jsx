import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout.jsx";

import { useState, useEffect } from "react";

import { CookiesProvider } from "react-cookie";
import { getCookie } from "cookies-next";
import { backend } from "../utils/ip";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  const [userId, setUserid] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [point, setPoint] = useState(0);
  const [whichCookie, setWhichCookie] = useState("");

  const userCookie = getCookie("loginInfo");
  let userName = "";
  let userEmail = "";

  if (userCookie) {
    userName = JSON.parse(
      Buffer.from(userCookie, "base64").toString("utf-8")
    ).username;
    userEmail = JSON.parse(
      Buffer.from(userCookie, "base64").toString("utf-8")
    ).email;
  }

  const setLocalinfo = () => {
    setEmail(userEmail);
    setUserid(userName);
  };

  //

  const [hash, setHash] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [mobile, setMobile] = useState(undefined);
  const accessToken = getCookie("accessToken");

  let didHash = "";
  let didName = "";
  let didMobile = "";
  let didEmail = "";

  if (!userCookie && accessToken) {
    let userHash = JSON.parse(
      Buffer.from(accessToken, "base64").toString("utf-8")
    ).hash;

    let userInfo = JSON.parse(
      Buffer.from(accessToken, "base64").toString("utf-8")
    ).stringCookie;

    didHash = userHash;
    didName = userInfo.split("&")[0].split("=")[1];
    didMobile = userInfo.split("&")[1].split("=")[1];
    didEmail = userInfo.split("&")[2].split("=")[1].split("&")[0];
  }

  const setDidUserInfo = () => {
    setHash(didHash);
    setName(didName);
    setMobile(didMobile);
    setEmail(didEmail);
  };

  //

  const getPoint = async () => {
    if (userCookie) {
      const email = JSON.parse(
        Buffer.from(userCookie, "base64").toString("utf-8")
      ).email;
      const response = await axios.post(`${backend}/api/auth/pointInquiry`, {
        email,
      });
      setPoint(response.data.point);
    } else if (!userCookie && accessToken) {
      // const response = await axios.get(
      //   `${oauthBack}/oauth/app/getPoint?email=${didEmail}&restAPI=${restAPI}`
      // );
      // setPoint(response.data.point);
      const response = await axios.get(
        `${backend}/api/oauth/getoauthPoint?email=${didEmail}`
      );
      setPoint(response.data.point);
    }
  };

  const cookieSelector = () => {
    if (userCookie) {
      setLocalinfo();
      getPoint();
      setWhichCookie("local");
    } else if (accessToken) {
      setDidUserInfo();
      getPoint();
      setWhichCookie("oauth");
    }
  };

  useEffect(() => {
    cookieSelector();
  }, [point]);

  return (
    <CookiesProvider>
      <ChakraProvider>
        <Layout m="2" email={email}>
          <Component
            {...pageProps}
            userId={userId}
            email={email}
            hash={hash}
            name={name}
            mobile={mobile}
            point={point}
            whichCookie={whichCookie}
            setPoint={setPoint}
          />
        </Layout>
      </ChakraProvider>
    </CookiesProvider>
  );
}

// export const getServerSideProps = (ctx) => {
//   const cookie = ctx.req ? ctx.req.headers.cookie : "";
//   const encodedCookie = cookie.split(";");

//   let cookieNeeded;

//   for (let i = 0; i < encodedCookie.length; i++) {
//     const tokenName = encodedCookie[i].split("=");
//     if (tokenName[0].trim() == "accessToken") {
//       cookieNeeded = tokenName;
//     }
//   }

//   console.log(cookieNeeded);

//   const email = JSON.parse(
//     Buffer.from(cookieNeeded[1], "base64").toString("utf-8")
//   ).email;

//   return { props: { appList: response.data.myapp } };
// };

export default MyApp;
