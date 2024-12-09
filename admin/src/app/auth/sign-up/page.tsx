'use client'
import React, { useState ,useEffect} from 'react';
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Icon,
  Select,
  InputLeftAddon,
  InputLeftElement
} from '@chakra-ui/react';
import DefaultAuthLayout from "@/layouts/auth/Default"
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { RiEyeCloseLine } from 'react-icons/ri';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { useLoading } from '@/context/loadingContext';
import { register } from '@/utils/url/api';
import OtpModal from '@/components/modal/otpModal';

export default function SignUp() {
  const router=useRouter()
  const {startLoading,stopLoading}=useLoading()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    countryCode: '',
    phoneNumber: '',
  });

  useEffect(()=>{
    router.push("/")
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '', // Ensure you define 'email' here
    password: '',
    confirmPassword: '',
    countryCode: '',
    phoneNumber: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [registerState,setRegisterState]=useState(false)
  
  const textColor = useColorModeValue('brand.100', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if(name==="phoneNumber"){
      if ( !/^\d{10}$/.test(value)) {
        errors.phoneNumber="Invalid phone number (10 digits required)"
      }else if(/^\d{10}$/.test(value)){
        setErrors({ ...errors, [name]: '' });
      }
    }else{
      setErrors({ ...errors, [name]: '' });
    }
    
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async() => {
    event.preventDefault();
    const newErrors = {
        firstName: '',
        lastName: '',
        email: '', // Ensure you define 'email' here
        password: '',
        confirmPassword: '',
        countryCode: '',
        phoneNumber: '',
      }
    if (!formData.email || !formData.email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.countryCode || !formData.countryCode.match(/^\+\d{1,4}$/)) {
      newErrors.countryCode = 'Invalid country code';
    }

    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number (10 digits required)';
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (newErrors.email.length===0&&newErrors.firstName.length===0&&newErrors.lastName.length===0&&newErrors.password.length===0&&newErrors.confirmPassword.length===0&&newErrors.countryCode.length===0&&newErrors.phoneNumber.length===0) {
      startLoading()
      try {
        const header={"Content-type":"application/json"}
        const response:any=await register({first_name: formData.firstName,last_name: formData.lastName,email: formData.email,phone_number: formData.countryCode+formData.phoneNumber,confirm_password: formData.confirmPassword,password: formData.password,country:"a9c86fca-1e74-4cc6-8a89-0273ea7ea2ac"},header)
        if(response.message==="User registered successfully"){
        stopLoading()
           localStorage.setItem("token",response.data.token)
           setRegisterState(true)
        }else{
          stopLoading()
        }
      } catch (error) {
        stopLoading()
      }
    } else {
      // If there are errors, update the state with the error messages
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleSubmit()  
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <DefaultAuthLayout illustrationBackground={'/img/auth/auth.png'}>
      <OtpModal open={registerState} />
     <Flex
      maxW={{ base: '100%', md: 'max-content' }}
      w={{ base: '100%', md: '420px' }}
      mx={{ base: 'auto', lg: '0px' }}
      me="auto"
      h="100%"
      alignItems="start"
      justifyContent="center"
      mb={{ base: '30px', md: '60px' }}
      px={{ base: '25px', md: '0px' }}
      mt={{ base: '0px', md: '0px' }}
      flexDirection="column"
    >
      <Heading mb="4">Sign Up</Heading>
      <Flex
        zIndex="2"
        direction="column"
        w={{ base: '100%', md: '420px' }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mx={{ base: 'auto', lg: 'unset' }}
        me="auto"
        mb={{ base: '20px', md: 'auto' }}
      >
      <form onSubmit={handleSubmit}>
        <FormControl mb="4" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </FormControl>
        {/* Add similar FormControl components for last name, email, phone number */}
        <FormControl mb="4" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            isInvalid={!!errors.email}
          />
          {errors.email && <Text color="red.500">{errors.email}</Text>}
        </FormControl>
        <FormControl mb="4" isRequired>
        <FormLabel>Country Code</FormLabel>
        <Select
          name="countryCode"
          value={formData.countryCode}
          onChange={handleInputChange}
        >
          <option value="+1">+1 (United States)</option>
          <option value="+91">+91 (India)</option>
        </Select>
        {errors.countryCode&&<Text color={"red.500"} >{errors.countryCode}</Text>}
        </FormControl>
        <FormControl mb="4" isRequired>
        <FormLabel>Phone Number</FormLabel>
        <InputGroup>
          <Input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            isInvalid={!!errors.phoneNumber}
            pattern="[0-9]{10}" // Use the pattern attribute to enforce 10 digits
          />
          <InputLeftElement pointerEvents="none">
          <Text>{formData.countryCode}</Text>
          </InputLeftElement>
        </InputGroup>
        {errors.phoneNumber && (
          <Text color="red.500">{errors.phoneNumber}</Text>
        )}
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              isInvalid={!!errors.password}
            />
            <InputRightElement width="3rem">
              <Icon
                color={textColorSecondary}
                _hover={{ cursor: 'pointer' }}
                as={showPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={handleShowPassword}
              />
            </InputRightElement>
          </InputGroup>
          {errors.password && <Text color="red.500">{errors.password}</Text>}
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            isInvalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <Text color="red.500">{errors.confirmPassword}</Text>
          )}
        </FormControl>
        <Button 
        type="submit" 
        fontSize="sm"
        variant="brand"
        fontWeight="500"
        w="100%"
        h="50"
        mb="24px"
        colorScheme="blue" 
        mt="4">
          Sign Up
        </Button>
      </form>
      </Flex>
      <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          maxW="100%"
          mt="0px"
        >
          <Box cursor={"pointer"}>
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Already have an account?
              <Text
                color={textColorBrand}
                as="span"
                ms="5px"
                fontWeight="500"
                onClick={()=>{startLoading();router.push("/auth/sign-in");stopLoading()}}
              >
                signin
              </Text>
            </Text>
          </Box>
        </Flex>
    </Flex>
    </DefaultAuthLayout>
  );
}
