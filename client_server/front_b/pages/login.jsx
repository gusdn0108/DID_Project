import { useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const setCookieAndMove = () => {
    const cookie = location.href.split("?")[1].split("=")[1];
    console.log(cookie);
    setCookie("accessToken", cookie, {
      maxAge: 60 * 60 * 24 * 1000,
    });
    location.href = "/";
  };

  useEffect(() => {
    setCookieAndMove();
  }, []);
  return <>login</>;
};

export default Login;
