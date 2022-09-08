import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [cemail, setEmail] = useState(undefined);
  const [chashId, setHashId] = useState(undefined);

  let userEmail = "";
  let userHash = "";

  const user = getCookie("user");
  if (user) {
    userEmail = JSON.parse(Buffer.from(user, "base64").toString("utf-8")).email;
    userHash = JSON.parse(Buffer.from(user, "base64").toString("utf-8")).hashId;
  }

  useEffect(() => {
    setEmail(userEmail);
    setHashId(userHash);
  }, []);

  return (
    <ChakraProvider>
      <Component {...pageProps} email={cemail} hashId={chashId} />
    </ChakraProvider>
  );
}

export default MyApp;
