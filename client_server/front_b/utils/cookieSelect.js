import { getCookie } from "cookies-next";
import { useState } from "react";

export const cookieSelect = () => {
  // DID login과 local Login 의 쿠키가 다르므로 뭘 가지고 있냐애 따라 쿠키나 상태 세팅을
  // 다르게 해주는게 좋을 것 같다.
  // 일단은 로컬 로그인의 쿠키를 우선으로 하겠다.

  const userCookie = getCookie("loginInfo");
  const accessToken = getCookie("accessToken");

  // 로컬 로그인 쿠키가 있을 경우,
  if (userCookie) {
    const [userId, setUserid] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [point, setPoint] = useState(0);

    let userName = JSON.parse(
      Buffer.from(userCookie, "base64").toString("utf-8")
    ).username;
    let userEmail = JSON.parse(
      Buffer.from(userCookie, "base64").toString("utf-8")
    ).email;

    console.log(userName);
    console.log(userEmail);

    return [userId, email];
    // 어차피 데이터 베이스가 완전히 바뀌였으므로 이부분은 수정할 여지가 많다. 일단 대충 넘어감
  }

  // 로컬 로그인 쿠키 없이 did login 쿠키만 있는 경우
  if (!userCookie && accessToken) {
    let userHash = JSON.parse(
      Buffer.from(accessToken, "base64").toString("utf-8")
    ).hash;

    let userInfo = JSON.parse(
      Buffer.from(accessToken, "base64").toString("utf-8")
    ).stringCookie;

    const didHash = userHash;
    const didName = userInfo.split("&")[0].split("=")[1];
    const didMobile = userInfo.split("&")[1].split("=")[1];
    const didEmail = userInfo.split("&")[2].split("=")[1].split("&")[0];

    return [didHash, didName, didMobile, didEmail];
  }
};
