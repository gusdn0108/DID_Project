# Todo list

1. redirectURI 등록 기능 추가해야 함-현재 업뎃 라우터만 존재
2. DID registerUser() 중복 email? hash 값에 대한 예외처리 해주기
3. back/router/user/user.ts
   (1) oAuthRegister - 중복에 대한 예외처리 해주기/ 응답 없이 멈춰있음,,,,DB에 넣을 restAPI값 받기
   (2) upDateUser - 컨트랙트 EVM에서 reverted 되는 부분 재확인하기/isRegisterd() 실행 시 false 떨어짐
   (3) searchUser - isRegistered() 실행 시 false 떨어지나 getUser()는 실행됨
   (4) deleteUser - isRegistered() 실행 시 false 떨어지고 deleteUser() 실행 안됨

# Done list

1. back/router/app 디렉토리
   디렉토리 내부의 모든 라우터에 대한 postman 테스트 완료

2. back/router/user/user 디렉토리
   (1) updatePassword 응답 객체 작성 및 테스트 완료
   (2) searchUser
3. back/router/user/login 디렉토리
   전체적으로 다시 봐야 함
   // import { Op } from 'sequelize/types';
