import { Modal, Box, ModalContent, Center, ModalBody, ModalOverlay, Image } from '@chakra-ui/react';

function LoadingModal({ isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay bg="blackAlpha.500" />
        <ModalContent>
          <ModalBody>
            <Center w="100%">
              <Image src="loading.gif" w="50rem" h="15rem" />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoadingModal;
