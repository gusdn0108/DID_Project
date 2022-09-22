import { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";
import { backend, frontend } from "../utils/ip";
import { deleteCookie } from "cookies-next";
import { pwdCheck } from "../utils/regiCheck.js";

const mypage = ({ email }) => {
  const [newPassword, setNewPassword] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [psError, setpsError] = useState(false);

  const setpwdCheck = (e) => {
    setPassword(e.target.value);
    setpsError(pwdCheck(password));
  };

  const getNewPw = (e) => {
    setNewPassword(e.target.value);
  };

  const changePw = async () => {
    if (pwdCheck(password) == false) {
      alert(
        "비밀번호는 영문자, 숫자, 특수문자 조합으로 8~15자리를 사용해주세요."
      );
      return;
    }

    if (newPassword !== password) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    const response = await axios.post(`${backend}/api/auth/updateUser`, {
      email,
      password,
    });

    if (response.data.status == false) {
      alert(response.data.msg);
      return;
    }

    if (response.data.status == true) {
      alert(`비밀 번호가 변경되었습니다. 다시 로그인 해주세요.`);
      deleteCookie("loginInfo", { path: "/", domain: `localhost` });
      location.href = `${frontend}`;
    }
  };

  return (
    <Box pt="6rem">
      <Box
        w="30%"
        mx="auto"
        my="6%"
        fontSize={"125%"}
        justifyContent="center"
        px="3%"
      >
        <FormControl mt="3">
          <Input
            type="password"
            onChange={setpwdCheck}
            placeholder="새로운 패스워드를 입력해주세요."
            border={"none"}
            borderBottom="1px"
            borderRadius={"0"}
            size="md"
            mb="1%"
          />

          <FormHelperText mb="7%" textAlign={"center"} fontSize="60%">
            {psError == true
              ? "사용 가능한 비밀번호입니다."
              : "비밀번호는 영문자, 숫자, 특수문자 포함 8~15자여야 합니다."}
          </FormHelperText>

          <Input
            type="password"
            onChange={getNewPw}
            placeholder="새 패스워드를 확인해주세요."
            border={"none"}
            borderBottom="1px"
            borderRadius={"0"}
            mb="9%"
          />

          <Button onClick={changePw} float="right" mr="2%">
            변경하기
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default mypage;
