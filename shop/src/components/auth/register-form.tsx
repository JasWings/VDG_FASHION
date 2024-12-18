import { useRouter } from 'next/router';
import Logo from '@/components/ui/logo';
import Input from '@/components/ui/forms/input';
import PasswordInput from '@/components/ui/forms/password-input';
import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { Form } from '@/components/ui/forms/form';
import type { RegisterUserInput } from '@/types';
import * as yup from 'yup';
import { useRegister } from '@/framework/user';
import PhoneInput from '../ui/forms/phone-input';
import { useState } from 'react';
import { RegisterAtom } from '../otp/registerAtom';
import { useAtom } from 'jotai';
import OtpCodeForm from '../otp/code-verify-form';
import { useOtpLogin } from '@/framework/user';
import Image from 'next/image';
import Select from '../ui/forms/select';
import { showToast } from '../ui/toast/toast';
import { useToken } from '@/lib/hooks/use-token';

const registerFormSchema = yup.object().shape({
  first_name: yup.string().required('error first name required'),
  last_name:yup.string().required('error first name required'),
  email: yup
    .string()
    .email('error-email-format')
    .required('error-email-required'),
  phone_number:yup.string(),
  password: yup.string().required('error-password-required'),
  confirm_password: yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
  .required('confirm password required'),
});

function RegisterForm() {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  const { mutate, isLoading, formError } = useRegister();
  const [phoneNumber, setPhoneNumber] = useState('');

  function onSubmit({ first_name,last_name, email, password,confirm_password}: RegisterUserInput) {
   if(phoneNumber.length===0||phoneNumber.length<8){
      showToast("phone number is required","warning")
      return;
    }else{
      mutate({
        first_name,
        last_name,
        email,
        password,
        phone_number:"+"+phoneNumber,
        confirm_password
       });
    }
  }

  return (
    <>
      <Form<RegisterUserInput>
        onSubmit={onSubmit}
        validationSchema={registerFormSchema}
        serverError={formError}
      >
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label={"First Name"}
              {...register('first_name')}
              variant="outline"
              className="mb-5"
              error={t(errors.first_name?.message!)}
            />
            <Input
              label={"Last Name"}
              {...register('last_name')}
              variant="outline"
              className="mb-5"
              error={t(errors.last_name?.message!)}
            />
            <Input
              label={t('text-email')}
              {...register('email')}
              type="email"
              variant="outline"
              className="mb-5"
              error={t(errors.email?.message!)}
            />
            <div>
            <div className='mb-5 w-full'>
            <label
            className="mb-3 block text-sm font-semibold leading-none text-body-dark"
          >
            PhoneNumber
          </label>
            <PhoneInput
            country={"in"}
            containerStyle={{height:"46px",width:"416px"}}
            inputClass='h-[46px] w-auto sm:w-[416px]'
            inputStyle={{width:"416px"}}
            showDropdown={false}
            countryCodeEditable={false}
            onChange={(value) => setPhoneNumber(value)}
            enableSearch={false}
            disableDropdown={true}
            // isValid={(value,country)=>{
            //   console.log(value,country)
            // }}
          />
          </div>
          </div>
            <PasswordInput
              label={"Password"}
              {...register('password')}
              error={t(errors.password?.message!)}
              variant="outline"
              className="mb-5"
            />
            <PasswordInput
              label={"Confirm Password"}
              {...register('confirm_password')}
              error={t(errors.confirm_password?.message!)}
              variant="outline"
              className="mb-5"
            />
            <div className="mt-8">
              <Button
                className="h-12 w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                {t('text-register')}
              </Button>
            </div>
          </>
        )}
      </Form>
      {/* End of forgot register form */}

      <div className="relative mt-8 mb-6 flex flex-col items-center justify-center text-sm text-heading sm:mt-11 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute -top-2.5 bg-light px-2 ltr:left-2/4 ltr:-ml-4 rtl:right-2/4 rtl:-mr-4">
          {t('text-or')}
        </span>
      </div>
      <div className="text-center text-sm text-body sm:text-base">
        {t('text-already-account')}{' '}
        <button
          onClick={() => openModal('LOGIN_VIEW')}
          className="font-semibold text-accent underline transition-colors duration-200 hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-0 ltr:ml-1 rtl:mr-1"
        >
          {t('text-login')}
        </button>
      </div>
    </>
  );
}
export default function RegisterView() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { closeModal ,openModal} = useModalAction();
  const { getToken } = useToken()
  const [RegisterState]=useAtom(RegisterAtom)
  const {
    mutate: otpLogin,
    isLoading: otpLoginLoading,
    serverError: optLoginError,
  } = useOtpLogin();


  function onOtpLoginSubmission(values: any) {
    const token = getToken()
    console.log(values,"values")
    otpLogin({
      ...values,
      token
    });
  }

  // openModal("OTP_LOGIN")
  function handleNavigate(path: string) {
    router.push(`/${path}`);
    closeModal();
  }

  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
      <div className="flex justify-center h-100">
        {/* <Logo /> */}
        <Image 
          src={"/icons/apple-icon-180.png"}
  
          alt={'SLR Logo'}
          width={100}
          height={100}
          // fill
          sizes="(max-width: 100px) 100vw"
          loading="eager"
          className="object-contain"
        />
      </div>
      {
        RegisterState.step==="RegisterForm"&&
        <p className="mt-4 mb-7 px-2 text-center text-sm leading-relaxed text-body sm:mt-5 sm:mb-10 sm:px-0 md:text-base">
        {t('registration-helper')}
        <span
          onClick={() => handleNavigate('terms')}
          className="mx-1 cursor-pointer text-accent underline hover:no-underline"
        >
          {t('text-terms')}
        </span>
        &
        <span
          onClick={() => handleNavigate('privacy')}
          className="cursor-pointer text-accent underline hover:no-underline ltr:ml-1 rtl:mr-1"
        >
          {t('text-policy')}
        </span>
      </p>
      }
      {
        RegisterState?.step==="OtpForm"&&(
          <p className="mt-4 mb-7 px-2 text-center text-sm leading-relaxed text-body sm:mt-5 sm:mb-10 sm:px-0 md:text-base">
             <span>otp sent to your register email</span>
          </p>
        )
      }
      {
        RegisterState.step==="RegisterForm"&&<RegisterForm />
      }
      {
        RegisterState?.step==="OtpForm"&&
        <OtpCodeForm 
        isLoading={otpLoginLoading}
        onSubmit={onOtpLoginSubmission}
        />
      }
    </div>
  );
}
