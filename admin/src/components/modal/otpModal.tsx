import React, { useState,useRef,useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { validateOtp } from '@/utils/url/api';
import { useLoading } from '@/context/loadingContext';

export default function OTPModal({open}) {
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(true);
  const [otpInputs, setOtpInputs] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const {startLoading,stopLoading}=useLoading()

  

  const handleOtpInputChange = (index, value) => {
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);
    if (index < otpInputs.length - 1 && value !== '') {
        inputRefs.current[index + 1].focus();
      }
  };

  const verifyOtp = async() => {
    const otp = otpInputs.join('');
    startLoading()
    try {
     const header= {
        "Content-Type": "application/json",
      }
      const response:any= await validateOtp({otp:Number(otp)},header)
      if(response.message==="Email Verified successfully"){
        window.location.href="/Admin/Products/productListing"
        stopLoading()

      }
    } catch (error) {
      stopLoading()   
      window.location.href="/auth/sign-in"
    }
  };

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        verifyOtp() 
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <>

        <Modal isOpen={open} onClose={() =>{}}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter OTP</ModalHeader>
            <ModalBody>
              <Stack direction="row" spacing={2}>
                {otpInputs.map((input, index) => (
                  <FormControl key={index}>
                    <Input
                      type="text"
                      maxLength={1}
                      value={input}
                      onChange={(e) => handleOtpInputChange(index, e.target.value)}
                      ref={(inputRef) => (inputRefs.current[index] = inputRef)}
                    />
                  </FormControl>
                ))}
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={verifyOtp}>
                Verify OTP
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  );
}
