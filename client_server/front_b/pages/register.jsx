import {
  Box,
  Button,
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { backend, frontend } from "../utils/ip.js";
import { pwdCheck } from "../utils/regiCheck.js";

const register = () => {
  const [password, setPassword] = useState(undefined);
  const [psError, setpsError] = useState(false);

  const [sentEmail, setSentEmail] = useState(false);
  const [verifyNum, setVerifyNum] = useState(undefined);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [domain, setDomain] = useState(undefined);
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  const setpwdCheck = (e) => {
    setPassword(e.target.value);
    setpsError(pwdCheck(password));
  };

  const getEmail = (e) => {
    setEmail(e.target.value);
  };

  const getName = (e) => {
    setName(e.target.value);
  };

  const domainSelect = (e) => {
    setDomain(e.target.value);
  };

  const getPhone = (e) => {
    setPhone(e.target.value);
  };

  const getAge = (e) => {
    setAge(e.target.value);
  };

  const invalidation = () => {
    setTimeout(setVerifyNum(undefined), 1000 * 60 * 3);
  };

  const sendEmail = async () => {
    const temail = document.querySelector("#userEmail").value;
    const tuserPw = document.querySelector("#password").value;

    setEmail(temail);
    setPassword(tuserPw);

    if (pwdCheck(tuserPw) == false) {
      alert(
        "비밀번호는 영문자, 숫자, 특수문자 조합으로 8~15자리를 사용해주세요."
      );
      return;
    }

    const regiEmail = email + domain;

    try {
      const response = await axios.post(`${backend}/api/auth/email`, {
        email: regiEmail,
        name,
      });
      setSentEmail(true);
      const verifyArray = response.data.number;
      const verfifyNumber =
        verifyArray[0] +
        verifyArray[1] +
        verifyArray[2] +
        verifyArray[3] +
        verifyArray[4] +
        verifyArray[5];
      console.log(verfifyNumber);

      setVerifyNum(verfifyNumber);
      invalidation;
    } catch (e) {
      alert("서버 에러");
    }
  };

  const verifyAccount = async () => {
    const verifier = document.querySelector("#verifier").value;
    if (verifier == verifyNum) {
      try {
        const regiEmail = email + domain;

        const response = await axios.post(`${backend}/api/auth/Signup`, {
          email: regiEmail,
          password,
          name,
          age,
          phone,
        });
        if (response.data.status == 1) {
          alert("회원가입이 완료되었습니다.");
          location.href = `${frontend}`;
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("인증 번호가 일치하지 않습니다");
      return;
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box pt="4rem" display="flex" justifyContent="center" w="20rem">
        <FormControl mt="3">
          <Text mb="8%" textAlign={"center"} fontSize="1.5rem">
            회원 가입
          </Text>
          {sentEmail == false ? (
            <>
              <FormLabel>Email</FormLabel>
              <Flex justifyContent={"center"}>
                <Input
                  type="text"
                  onChange={getEmail}
                  placeholder="email을 입력해주세요"
                  id="userEmail"
                  size="sm"
                  mb="5%"
                />
                <Select
                  placeholder="Select Domain"
                  size="sm"
                  id="domainSelector"
                  onChange={domainSelect}
                >
                  <option value="@kakao.com">@kakao.com</option>
                  <option value="@naver.com">@naver.com</option>
                  <option value="@gmail.com">@gmail.com</option>
                </Select>
              </Flex>

              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={setpwdCheck}
                placeholder=" password을 입력해주세요"
                id="password"
                size="sm"
              />
              <FormHelperText mb="6%">
                {psError == true
                  ? "사용 가능한 비밀번호입니다."
                  : "비밀번호는 영문자, 숫자, 특수문자 포함 8~15자여야 합니다."}
              </FormHelperText>

              <FormLabel>이름</FormLabel>
              <Input
                placeholder="이름을 입력해주세요"
                size="sm"
                onChange={getName}
                mb="6%"
              />

              <FormLabel>휴대폰 번호</FormLabel>
              <Input
                placeholder="전화번호를 입력해주세요(숫자만 입력)"
                size="sm"
                mb="6%"
                onChange={getPhone}
              />
            </>
          ) : (
            ""
          )}
          {sentEmail == false ? (
            <Input type="submit" value="회원가입" onClick={sendEmail} />
          ) : (
            <>
              <Input
                type="text"
                placeholder="발송된 6자리 숫자를 입력하세요"
                id="verifier"
              />
              <FormHelperText>인증 번호는 3분간 유효합니다.</FormHelperText>
              <Input type="submit" onClick={verifyAccount} />
            </>
          )}
        </FormControl>
      </Box>
    </Box>
  );
};

export default register;
