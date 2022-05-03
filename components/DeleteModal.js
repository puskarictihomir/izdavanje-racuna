import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

export default function DeleteModal({ isOpen, size = "md", onClose, handleRemove }) {
  const router = useRouter();

  const deletionConfirmed = () => {
    handleRemove();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} size={size} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Jeste li sigurni?</ModalHeader>
        <ModalCloseButton />
        <ModalFooter justifyContent="start">
          <Button colorScheme="red" onClick={() => deletionConfirmed()}>
            Obriši
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
