'use client';
import React,{useState,useEffect} from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import DefaultAuthLayout from "@/layouts/auth/Default"
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { Spinner } from '@chakra-ui/react';
import  {ThreeDots} from "react-loader-spinner"
import Image from 'next/image';
import { login } from '@/utils/url/api';
import Loader from '@/utils/helpers/loader';
import { isWindowAvailable } from '@/utils/navigation';
import { useLoading } from '@/context/loadingContext';
import { useCustomToast } from '@/components/toast/Toast';

export default function SignIn() {
  const {startLoading,stopLoading} =useLoading()
  const router=useRouter()
  const showToast=useCustomToast()
  
  
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const tokenChecking=()=>{
    if(isWindowAvailable()&&localStorage!==undefined){
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/Admin/Dashboard');
    }
   }
  }
  if(isWindowAvailable()){
    tokenChecking()
  }
  }, []);

  const textColor = useColorModeValue('brand.100', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  

  const handleSignIn=async()=>{
        if(email!==""&&password!==""&&email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)&&password.length >= 8){
          try {
            event.preventDefault()
            startLoading()
            const header={"Content-type":"application/json"}
            const response:any=await login({username:email,password:password},header)
            if (response.status==="success") {
              const { data } = await response
              if(data.token){
                localStorage.setItem("token",data.token)
                localStorage.setItem("userId",data.user_uid)
                router.push("/Admin/Dashboard")
              }
            } else {
              event.preventDefault()
              stopLoading()
             showToast({title:response.message,status:"success",position:"top"})
            }
          } catch (error) {
            event.preventDefault()
            stopLoading()
            showToast({position:"top",title:error.message,status:"error"})
          }
        }else {
          event.preventDefault()
          if (email === '' ||!email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/) ) {
            setEmailError(true);
            showToast({title:"Enter valid email",status:"warning",position:"top"})
          }
          if (password === '' || password.length < 8) {
            setPasswordError(true);
            showToast({title:"Must be 8 characters",status:"warning",position:"top"})
          }
        }
   }
  

  return (
    <>
      <DefaultAuthLayout illustrationBackground={'/img/auth/auth.png'}>
      <Flex
      maxW={{ base: '100%', md: 'max-content' }}
      w="100%"
      mx={{ base: 'auto', lg: '0px' }}
      me="auto"
      h="100%"
      alignItems="start"
      justifyContent="center"
      mb={{ base: '30px', md: '60px' }}
      px={{ base: '25px', md: '0px' }}
      mt={{ base: '40px', md: '14vh' }}
      flexDirection="column"
    >       
      <Box me="auto">
        <Heading color={textColor} textStyle={"fs1"} mb="10px">
          Sign In
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          textStyle={"fs2"}
        >
          Enter your email and password to sign in!
        </Text>
      </Box>
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
        <form onSubmit={handleSignIn}>
        <FormControl isRequired>
          <FormLabel
            display="flex"
            ms="4px"
            textStyle={"fs3"}
            fontWeight="500"
            color={textColor}
            mb="8px"
          >
            Email
          </FormLabel>
          {emailError&&<Text as="span" color={"red.500"}>Enter Email </Text>}
          <Input
            isRequired={true}
            id={"email"}
            variant="auth"
            fontSize="sm"
            ms={{ base: '0px', md: '0px' }}
            type="email"
            placeholder="Enter Your email "
            mb="24px"
            fontWeight="500"
            size="lg"
            required
            onChange={(e)=>{setEmail(e.target.value);setEmailError(false)}}
            borderColor={emailError ? 'red.500' : 'gray.200'}
          />
          <FormLabel
            ms="4px"
            textStyle={"fs3"}
            color={textColor}
            display="flex"
          >
            Password
          </FormLabel>
          {passwordError&&<Text pl={"5px"} as={"span"} color={"red.500"}>Password must be at least 8 characters</Text>}
          <InputGroup size="md">
            <Input
              isRequired={true}
              id={"password"}
              fontSize="sm"
              placeholder="Enter Your Password"
              mb="24px"
              size="lg"
              type={show ? 'text' : 'password'}
              variant="auth"
              onChange={(e)=>{setPassword(e.target.value);setPasswordError(false)}}
              borderColor={passwordError ? 'red.500' : 'gray.200'}
            />
            <InputRightElement display="flex" alignItems="center" mt="4px">
              <Icon
                color={textColorSecondary}
                _hover={{ cursor: 'pointer' }}
                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={handleClick}
              />
            </InputRightElement>
          </InputGroup>
        {/*  <Flex justifyContent="space-between" align="center" mb="24px">
            <FormControl display="flex" alignItems="center" >
              <Checkbox
                id="remember-login"
                colorScheme="brandScheme"
                me="10px"
              />
              <FormLabel
                htmlFor="remember-login"
                mb="0"
                color={textColor}
                textStyle={"fs3"}
              >
                Keep me logged in
              </FormLabel>
            </FormControl>
            <Link href="/auth/forgot-password">
              <Text
                color={textColorBrand}
                fontSize="sm"
                w="124px"
                fontWeight="500"
              >
                Forgot password?
              </Text>
            </Link>
          </Flex>
          */}
          <Button
            fontSize="sm"
            variant="brand"
            _hover={{bg:"brand"}}
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            cursor={email.length===0&&password.length===0?"not-allowed":"pointer"}
            disabled={email.length===0&&password.length===0}
            type="submit" 
          >
            Sign In
          </Button>
        </FormControl>
        </form>
        {/* <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          maxW="100%"
          mt="0px"
        >
          <Box cursor={"pointer"}>
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Not registered yet?
              <Text
                color={textColorBrand}
                as="span"
                ms="5px"
                fontWeight="500"
                onClick={()=>{startLoading();router.push("/auth/sign-up");stopLoading()}}
              >
                Create an Account
              </Text>
            </Text>
          </Box>
        </Flex> */}
      </Flex>
    </Flex>
    </DefaultAuthLayout>
     
    </>
  );
}
