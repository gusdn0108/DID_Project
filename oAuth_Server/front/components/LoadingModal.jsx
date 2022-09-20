import { Modal, Text, Box, ModalContent, ModalBody, Image } from '@chakra-ui/react';

function LoadingModal({ isOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalBody>
            <Box w="100%">
              <Image src="https://devtalk.kakao.com/uploads/default/original/2X/8/8d3426581b592b46157de64b919d4378b504d346.gif" w="100rem" h="25rem" />
              <Text textAlign="center" fontSize="2rem" fontWeight="semibold">
                LOADING. . .
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoadingModal;
