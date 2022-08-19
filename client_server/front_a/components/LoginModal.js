import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Lorem, ModalFooter, Input } from '@chakra-ui/react';

const LoginModal = ({ loginIsOpen, loginOnClose }) => {
  return (
    <>
      <Modal isOpen={loginIsOpen} onClose={loginOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input variant="flushed" placeholder="Flushed" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={loginOnClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
