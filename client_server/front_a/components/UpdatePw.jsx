import { Button, Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, ModalFooter, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { deleteCookie } from 'cookies-next';

const updatePwModal = ({ user }) => {
  const [password, setPassword] = useState('');
  const [checkpassword, setCheckpassword] = useState('');
  const [pwcheck, setPwCheck] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClick = async (req, res) => {
    if (password === checkpassword) {
      const response = await axios.post('http://localhost:4000/api/auth/updateUser', {
        email: user.email,
        password,
      });
      if (response.data.status) {
        alert('비밀번호가 변경되었습니다.');
        deleteCookie('user', { req, res, maxAge: 60 * 60 * 24 * 1000 });
        location.href = 'http://localhost:3000';
      } else {
        alert('비밀번호 변경을 실패하였습니다.');
      }
    }
  };

  const changePw = (e) => {
    const passwordCd = /^(?=.*[a-zA-Z])(?=.*[\~\․\!\@\#\$\%\^\&\*\(\)\_\-\+\=\[\]\|\\\;\:\\'\"\<\>\,\.\?\/])(?=.*[0-9]).{9,21}$/;

    setPassword(e.target.value);

    if (passwordCd.test(e.target.value)) {
      setPwCheck(true);
    } else {
      setPwCheck(false);
    }

    if (e.target.value === '') setPwCheck('');
  };

  return (
    <>
      <Button mt="0.5rem" colorScheme="teal" variant="outline" onClick={onOpen}>
        비밀번호 변경하기
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>비밀번호 변경</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input variant="flushed" placeholder="비밀번호를 입력해주세요" type="password" onChange={changePw} />
            {pwcheck === '' ? null : !pwcheck ? <Text style={{ color: 'red', fontSize: '12px' }}>영문자, 특수문자, 숫자를 포함하여 9~21자리로 구성해주세요.</Text> : <Text style={{ color: 'green', fontSize: '12px' }}>사용 가능한 비밀번호입니다.</Text>}
            <Input variant="flushed" placeholder="비밀번호를 다시 입력해주세요" type="password" onChange={(e) => setCheckpassword(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button width="5rem" colorScheme="teal" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button width="5rem" colorScheme="teal" variant="outline" onClick={onClick}>
              변경
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default updatePwModal;
