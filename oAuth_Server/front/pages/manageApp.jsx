import {
  Box,
  Flex,
  Text,
  Divider,
  useDisclosure,
  Center,
  Button,
  Th,
  Tr,
  Td,
  Table,
  Thead,
  Tbody,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { backend } from "../utils/ip.js";
import AppModal from "../components/appModal.jsx";

const manageApp = ({ appList, email }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [myAppList, setmyAppList] = useState(appList);

  const [whichApp, setWhichApp] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isModifying, setIsModifying] = useState(null);
  const [appRestAPI, setappRestAPI] = useState(undefined);
  const [appSecret, setAppSecret] = useState(undefined);
  const [uri, seturi] = useState(undefined);
  const [getUserInfo, setGetUserInfo] = useState(undefined);
  const [impact, setImpact] = useState(false);

  const getAppinfo = async (restAPI) => {
    const response = await axios.post(`${backend}/oauth/app/appinfo`, {
      restAPI,
    });

    setWhichApp(response.data.result.appName);
    setappRestAPI(response.data.result.restAPI);
    setAppSecret(response.data.result.client_secret);

    seturi(response.data.result.redirectURI);
    setGetUserInfo(response.data.result.neededInfo);
    setShowInfo(true);
  };

  const setUri = (k) => (e) => {
    uri[k] = e.target.value;
  };

  const confirmURI = (k) => (e) => {
    if (e.key !== "Enter") return;
    setIsModifying(null);
  };

  const modifyRed = async () => {
    if (isModifying !== null) {
      alert(`uri 설정을 완료한 후 계속 진행해주세요.`);
      return;
    }
    const response = await axios.post(`${backend}/oauth/app/updateRedirect`, {
      restAPI: appRestAPI,
      uris: uri,
    });
    alert(response.data.msg);
  };

  const changeReq = async (k) => {
    getUserInfo[k].get = !getUserInfo[k].get;

    const response = await axios.post(`${backend}/oauth/app/getInfoUpdate`, {
      getUserInfo: getUserInfo,
      restAPI: appRestAPI,
    });
    if (response.data.status == true) {
      alert(response.data.msg);
      setImpact(!impact);
      return;
    }
    alert(response.data.msg);
  };

  const uris = uri?.map((v, k) => {
    return (
      <Box key={k} h="2rem" justifyContent={"center"}>
        {isModifying == k ? (
          <Input
            placeholder="redirect url을 등록해주세요."
            w="70%"
            mb="1%"
            size="sm"
            px="3%"
            defaultValue={uri[k]}
            onChange={setUri(k)}
            onKeyDown={confirmURI(k)}
            borderColor={"gray.400"}
            id="redirect"
          />
        ) : uri[k] == null ? (
          <Box
            onClick={() => setIsModifying(k)}
            mb="1%"
            textColor={"gray.500"}
            id="redirect1"
          >
            redirect uri를 등록해주세요
          </Box>
        ) : uri[k] == "" ? (
          <Box
            onClick={() => setIsModifying(k)}
            mb="1%"
            textColor={"gray.500"}
            id="redirect2"
          >
            redirect uri를 등록해주세요
          </Box>
        ) : (
          <Box onClick={() => setIsModifying(k)} mb="1%" id="redirect3">
            {uri[k]}
          </Box>
        )}
      </Box>
    );
  });

  const getUserInfos = getUserInfo?.map((v, k) => {
    return (
      <Tr key={k}>
        <Td textAlign={"center"}>{v.att}</Td>
        <Td textAlign={"center"}>
          {v.get.toString() == "true" ? (
            <Text>요청</Text>
          ) : (
            <Text>요청하지 않음</Text>
          )}
        </Td>
        <Td textAlign={"center"}>
          <Button
            onClick={() => changeReq(k)}
            id={v.att}
            disabled={v.att === "name" || v.att === "email" ? true : false}
          >
            {v.get.toString() == "true" ? (
              <Text color="black">요청 받지 않기</Text>
            ) : (
              <Text color="black"> 요청하기</Text>
            )}
          </Button>
        </Td>
      </Tr>
    );
  });

  const showAppList = myAppList?.map((v, k) => {
    return (
      <Box p="5%" key={k} fontSize="120%">
        <Flex justifyContent={"space-around"}>
          <Text px="5%" onClick={() => getAppinfo(v.restAPI)}>
            {v.appName}
          </Text>
        </Flex>
      </Box>
    );
  });

  const getMyApp = async () => {
    const response = await axios.post(`${backend}/oauth/app/getMyApp`, {
      email: email,
    });

    setmyAppList(response.data.myapp);
  };

  const deleteApp = async () => {
    const returnValue = confirm(
      `어플리케이션을 삭제하면 복구가 불가능 합니다. 정말 삭제하시겠습니까?`
    );

    if (returnValue == true) {
      const response = await axios.post(`${backend}/oauth/app/deleteApp`, {
        restAPI: appRestAPI,
        client_secret: appSecret,
      });
      alert(response.data.msg);
      setWhichApp(null);
      setShowInfo(false);
      getMyApp();
    }
  };

  useEffect(() => {}, [isOpen, whichApp]);

  const closeAndUpdate = () => {
    onClose();
    getMyApp();
    setWhichApp(null);
    setShowInfo(false);
  };

  return (
    <Box bg="#160627" h="100%">
      <Center w="100%" py="5%" px="5%" h="100%">
        <Box w="70%" h="100%" mx="auto" p="3%">
          <Flex mx="auto" my="0" justifyContent={"center"} mb="3%">
            <Box w="40%" mx="auto" my="0">
              <Text
                textAlign={"center"}
                fontSize={"175%"}
                mb="0.5rem"
                color={"white"}
              >
                어플리케이션 등록
              </Text>
              <Flex justifyContent={"center"}>
                <Button onClick={onOpen} color="white" variant="outline" m="2%">
                  어플리케이션 생성
                </Button>
                <AppModal
                  isOpen={isOpen}
                  onClose={closeAndUpdate}
                  email={email}
                  display="block"
                />
              </Flex>
            </Box>
          </Flex>

          <Flex>
            <Box mx="auto" my="3%" justifyContent={"center"}>
              <Text fontSize={"200%"} color={"white"}>
                내 어플리케이션
              </Text>
              <Box color={"white"}>{showAppList}</Box>
            </Box>
          </Flex>

          <Divider />

          <Box
            pt="5%"
            w="70%"
            mx="auto"
            my="2%"
            bg={whichApp == null ? "" : "white"}
            borderRadius="4rem"
          >
            <Flex flexDirection={"column"} alignItems="center" mb="3%">
              <Box fontSize={"180%"}>
                {whichApp == null ? "" : <Text>Application : {whichApp}</Text>}
              </Box>
            </Flex>

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              w="80%"
              mx="auto"
            >
              {showInfo == false ? (
                ""
              ) : (
                <Box>
                  <Table mb="3%">
                    <Thead>
                      <Tr>
                        <Th textAlign={"center"} fontSize="80%">
                          Rest API
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td textAlign={"center"}>{appRestAPI}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                  <Table mb="3%">
                    <Thead>
                      <Tr>
                        <Th textAlign={"center"} fontSize="80%">
                          Client Secret
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td textAlign={"center"}>{appSecret}</Td>
                      </Tr>
                    </Tbody>
                  </Table>

                  <Box
                    textAlign={"center"}
                    borderColor="white"
                    border={"3px"}
                    w="100%"
                  >
                    <Box fontSize={"175%"} mt="2%">
                      {" "}
                      사용자 정보 요청{" "}
                    </Box>
                    <Text mb="3%">
                      사용자에게 제공을 요청할 정보를 선택해주세요
                    </Text>

                    <Box mx="auto" mb="2%" w="100%">
                      <Flex justifyContent={"space-around"}>
                        <Table>
                          <Thead>
                            <Tr>
                              <Th textAlign={"center"}> 항목 이름 </Th>
                              <Th textAlign={"center"}> 상태 </Th>
                              <Th textAlign={"center"}> 수정 </Th>
                            </Tr>
                          </Thead>
                          <Tbody>{getUserInfos}</Tbody>
                        </Table>
                      </Flex>
                    </Box>
                  </Box>

                  <Divider orientation="horizontal" my="3%" />

                  <Box textAlign={"center"} w="100%">
                    <Box fontSize={"175%"} mt="3%">
                      Redirect URI 관리
                    </Box>
                    <Text mb="2%">
                      리다이렉트 url은 최대 5개까지 등록할 수 있습니다.
                    </Text>

                    <Box mb="2%">{uris}</Box>

                    <Box mb="1%">
                      <Text>uri 수정 후, 수정 완료 버튼을 눌려주세요.</Text>
                    </Box>
                    <Box mx="5%" my="10%">
                      <Button onClick={modifyRed} mx="1%">
                        수정 완료
                      </Button>
                      <Button
                        mx="1%"
                        onClick={deleteApp}
                        colorScheme="red"
                        variant={"outline"}
                      >
                        어플리케이션 삭제
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Flex>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export const getServerSideProps = async (ctx) => {
  const cookie = ctx.req ? ctx.req.headers.cookie : "";
  const encodedCookie = cookie.split(";");

  let cookieNeeded;

  for (let i = 0; i < encodedCookie.length; i++) {
    const tokenName = encodedCookie[i].split("=");
    if (tokenName[0].trim() == "user") {
      cookieNeeded = tokenName;
    }
  }

  const email = JSON.parse(
    Buffer.from(cookieNeeded[1], "base64").toString("utf-8")
  ).email;

  const response = await axios.post(`${backend}/oauth/app/getMyApp`, {
    email: email,
  });

  return { props: { appList: response.data.myapp } };
};

export default manageApp;
