import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, FormControl, FormLabel, Input } from "@chakra-ui/react";

const LoginModal = ({isOpen, onClose, getRemain, getTokenTable}) => {

    const loginHandler = () => {
        const userEmail = document.querySelector('#userEmail')
        const userPw = document.querySelector('#userPw')

        console.log(userEmail.value, userPw.value)
    }

    const didLoginHandler = () => {
        console.log('did login req')
    }

    return(
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {/* <ModalHeader fontSize='3xl'>Login</ModalHeader> */}
                <ModalCloseButton px='8' py='8'/>
    
                <ModalBody px='5rem' pt='4rem' pb='6'>
                    <FormControl>
                        <FormLabel fontSize='2xl' mb='2.5'>Email</FormLabel>
                        <Input type='text' placeholder='email을 입력해주세요' size='md' id='userEmail' mb='5'/>

                        <FormLabel fontSize='2xl' mb='2.5'>Password</FormLabel>
                        <Input type='password' placeholder='password을 입력해주세요' size='md' id='userPw' mb='5'/>
                    </FormControl>
                </ModalBody>
    
                <ModalFooter mb='8' px='20' justifyContent='space-between'>
                    <Button onClick={loginHandler} colorScheme='blue' w='32'>login</Button>
                    <Button onClick={didLoginHandler} colorScheme='blue' w='32' >DID login</Button>
                </ModalFooter>

            </ModalContent>
            </Modal>
        </>
    )
  }
  
  
  export default LoginModal;