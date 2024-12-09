import React from 'react'
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
  useDisclosure,Divider
} from '@chakra-ui/react'

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  state:string;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, message,onClose ,state}) => {
   return(
  <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset={"slideInTop"}>
    <ModalOverlay 
    
    />
    <ModalContent>
      <ModalHeader p={"16px"}>{state}</ModalHeader>
      <Divider />
      <ModalCloseButton textAlign={"center"} p={"16px"}/>
      <ModalBody p={"16px"} pb={"32px"}>
        <Text fontSize={"16px"} color={"B2B6BD"}>{message}</Text>
      </ModalBody>
      <Divider />
      <ModalFooter>
        <Button onClick={onClose} borderRadius={"8px"} py={"12px"} color={"white"} px={"6px"} _hover={{bg:"brand.500"}} bg={"brand.500"}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
   )
}

export default CustomModal;
