import { useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = ({ position, title, status }) => {
    toast({
      position: position,
      title: title,
      status: status,
      isClosable: true,
      duration:1000,
    });
  };

  return showToast;
};
