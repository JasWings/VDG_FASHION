import React, { useState, useCallback } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const modalStyles = {
    content: {
      transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 1m ease',
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset={"slideInTop"} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton outline={"none"} bg={"red.500"} color={"white"} rounded={"180px"}/>
        <ModalBody>
          <Text fontSize={"20px"}>{message}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleConfirm} borderRadius={"8px"} colorScheme="red" size={"md"}>
            Delete
          </Button>
          <Button onClick={onClose} ml={3} borderRadius={"8px"} colorScheme={"yellow"} size={"md"}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
