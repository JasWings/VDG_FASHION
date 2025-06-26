import { useModalAction } from '@/components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { toast } from 'react-toastify';
import client from './client';
import { authorizationAtom } from '@/store/authorization-atom';
import { useAtom } from 'jotai';
import { signOut as socialLoginSignOut } from 'next-auth/react';
import { useToken } from '@/lib/hooks/use-token';
import { API_ENDPOINTS } from './client/api-endpoints';
import { useState } from 'react';
import type {
  RegisterUserInput,
  ChangePasswordUserInput,
  OtpLoginInputType,
} from '@/types';
import { initialOtpState, optAtom } from '@/components/otp/atom';
import { useStateMachine } from 'little-state-machine';
import {
  initialState,
  updateFormState,
} from '@/components/auth/forgot-password';
import { clearCheckoutAtom } from '@/store/checkout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';
import { showToast } from '@/components/ui/toast/toast';
import { RegisterAtom } from '@/components/otp/registerAtom';
import { getErrorMessage } from '@/lib/error';
import Cookies from 'js-cookie';
import { AUTH_TOKEN_KEY, EMAIL_VERIFIED } from '@/lib/constants';
import { useCart } from '@/store/quick-cart/cart.context';



export function useUser() {
  const [isAuthorized] = useAtom(authorizationAtom);
  const { setEmailVerified, getEmailVerified } = useToken();
  const { emailVerified } = getEmailVerified();
  const router = useRouter();

  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.USERS_ME],
    client.users.me,
    {
      enabled: isAuthorized,
      retry: false,
      onSuccess: (data) => {
        if (emailVerified === false) {
          setEmailVerified(true);
          router.reload();
          return;
        }
      },
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 409) {
            setEmailVerified(false);
            router.push(Routes.verifyEmail);
            return;
          }
          if (router.pathname === Routes.verifyEmail) {
            return;
          }
        }
      },
    }
  );
  
  //TODO: do some improvement here
  return { me: data, isLoading, error, isAuthorized };
}

export function useGetAddress() {
  const [isAuthorized] = useAtom(authorizationAtom);
  const { setEmailVerified, getEmailVerified } = useToken();
  const { emailVerified } = getEmailVerified();
  const router = useRouter();

  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.GET_ADDRESS],
    client.users.getAdrress,
    {
      enabled: true,
      retry: false,
      onSuccess: (data) => {
      },
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 409) {
            setEmailVerified(false);
            router.push(Routes.verifyEmail);
            return;
          }
          if (router.pathname === Routes.verifyEmail) {
            return;
          }
        }
      },
    }
  );
  
  //TODO: do some improvement here
  return { data: data?.data ?? [], isLoading, error, isAuthorized };
}

export const useDeleteAddress = () => {
  const { closeModal } = useModalAction();
  const queryClient = useQueryClient();
  return useMutation(client.users.deleteAddress, {
    onSuccess: (data) => {
      if (data) {
        toast.success('successfully-address-deleted');
        closeModal();
        return;
      }
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};

      toast.error(data?.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS_ME);
    },
  });
};
export const useUpdateEmail = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(client.users.update, {
    onSuccess: (data) => {
      if (data) {
        toast.success(t('successfully-email-updated'));
      }
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};

      toast.error(data?.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS_ME);
    },
  });
};

export const useUpdateAddress = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { closeModal } = useModalAction();
  
  return useMutation(client.users.address, {
    onSuccess: async(data:any) => {
      
      await client.cart.updateAddress({address_uuid:data.data.uuid,type:data.data.address_type})
      if (data?.data?.id) {
        toast.success(`${t('Address-Added-successful')}`);
        window.location.reload()
        closeModal();
      }
    },
    onError: (error) => {
      const error_message = getErrorMessage(error)
      
      toast.error(error_message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS_ME);
    },
  });
};

export const useUpdateUser = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { closeModal } = useModalAction();
  return useMutation(client.users.update, {
    onSuccess: (data) => {
      if (data?.status==="success") {
        toast.success(`${t('profile-update-successful')}`);
        closeModal();
      }
    },
    onError: (error) => {
      toast.error(`${t('error-something-wrong')}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USERS_ME);
    },
  });
};

export const useContact = () => {
  const { t } = useTranslation('common');

  return useMutation(client.users.contactUs, {
    onSuccess: (data) => {
      if (data.uuid) {
        toast.success(`successfully added`);
      } else {
        toast.error(`${t(data.message)}`);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export function useLogin() {
  const { t } = useTranslation('common');
  const [_, setAuthorized] = useAtom(authorizationAtom);
  const { closeModal } = useModalAction();
  const { setToken } = useToken();
  let [serverError, setServerError] = useState<string | null>(null);
  const { syncLocalCartToBackend } = useCart()

  const { mutate, isLoading } = useMutation(client.users.login, {
    onSuccess: async (data) => {
      if (!data.data.token) {
        setServerError('error-credential-wrong');
        return;
      }
      setToken(data.data.token);
      setAuthorized(true);
      showToast("Login Successfully","success")
      await syncLocalCartToBackend()
      closeModal();
      window.location.reload()
    },
    onError: (error: Error) => {
      showToast(error?.response?.data?.message,"error")
    },
  });

  return { mutate, isLoading, serverError, setServerError };
}

export function useSocialLogin() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { setToken } = useToken();
  const [_, setAuthorized] = useAtom(authorizationAtom);

  return useMutation(client.users.socialLogin, {
    onSuccess: (data) => {
      if (data?.token && data?.permissions?.length) {
        setToken(data?.token);
        setAuthorized(true);
        return;
      }
      if (!data.token) {
        toast.error(`${t('error-credential-wrong')}`);
      }
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
    onSettled: () => {
      queryClient.clear();
    },
  });
}

export function useSendOtpCode({
  verifyOnly,
}: Partial<{ verifyOnly: boolean }> = {}) {
  let [serverError, setServerError] = useState<string | null>(null);
  const [otpState, setOtpState] = useAtom(optAtom);

  const { mutate, isLoading } = useMutation(client.users.sendOtpCode, {
    onSuccess: (data) => {
      if (!data.success) {
        setServerError(data.message!);
        return;
      }
      setOtpState({
        ...otpState,
        otpId: data?.id!,
        isContactExist: data?.is_contact_exist!,
        phoneNumber: data?.phone_number!,
        step: data?.is_contact_exist! ? 'OtpForm' : 'RegisterForm',
        ...(verifyOnly && { step: 'OtpForm' }),
      });
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  return { mutate, isLoading, serverError, setServerError };
}

export function useVerifyOtpCode({
  onVerifySuccess,
}: {
  onVerifySuccess: Function;
}) {
  const [otpState, setOtpState] = useAtom(optAtom);
  let [serverError, setServerError] = useState<string | null>(null);
  const { mutate, isLoading } = useMutation(client.users.verifyOtpCode, {
    onSuccess: (data) => {
      if (!data.success) {
        setServerError(data?.message!);
        return;
      }
      if (onVerifySuccess) {
        onVerifySuccess({
          phone_number: otpState.phoneNumber,
        });
      }
      setOtpState({
        ...initialOtpState,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isLoading, serverError, setServerError };
}

export function useOtpLogin() {
  const [otpState, setOtpState] = useAtom(optAtom);
  const { t } = useTranslation('common');
  const [_, setAuthorized] = useAtom(authorizationAtom);
  const { closeModal } = useModalAction();
  const { setToken } = useToken();
  const queryClient = new QueryClient();
  let [serverError, setServerError] = useState<string | null>(null);

  const { mutate: otpLogin, isLoading } = useMutation(client.users.verifyOtpCode, {
    onSuccess: (data) => {
      // if (!data.token) {
      //   setServerError('text-otp-verify-failed');
      //   return;
      // }
      // setToken(data.token!);
      setToken(data.data.new_token)
      showToast(data.message,"success")
      // setAuthorized(true);
      setOtpState({
        ...initialOtpState,
      });
      window.location.reload()
      closeModal();
    },
    onError: (error: Error) => {
      console.log(error.message);
      showToast(error?.response?.data?.message)
    },
    onSettled: () => {
      queryClient.clear();
    },
  });

  function handleSubmit(input: OtpLoginInputType) {
    otpLogin({
      ...input,
      phone_number: otpState.phoneNumber,
      otp_id: otpState.otpId!,
    });
  }

  return { mutate: handleSubmit, isLoading, serverError, setServerError };
}

export function useRegister() {
  const { t } = useTranslation('common');
  const { setToken } = useToken();
  const [_, setAuthorized] = useAtom(authorizationAtom);
  const { closeModal } = useModalAction();
  let [formError, setFormError] = useState<Partial<RegisterUserInput> | null>(
    null
  );
  const [RegisterState,setRegisterState]=useAtom(RegisterAtom)
  const { syncLocalCartToBackend } = useCart()

  const { mutate, isLoading } = useMutation(client.users.register, {
    onSuccess: async (data:any) => {
      if (data.data.new_token) {
        setToken(data.data.new_token)
        Cookies.set(AUTH_TOKEN_KEY, data.data.new_token);
        showToast(data.message,"success")
        await syncLocalCartToBackend()
        // setAuthorized(true);
        // setRegisterState({step:"OtpForm"})
        window.location.reload()
        closeModal();
        return;
      }
      if (!data.token) {
        toast.error(`${t('error-credential-wrong')}`);
      }
    },
    onError: (error) => {
      // window.location.reload()
      const {
        response: { data },
      }: any = error ?? {};
      showToast(error?.response?.data?.message,"error")
      setFormError(data);
    },
  });

  return { mutate, isLoading, formError, setFormError };
}
export function useResendVerificationEmail() {
  const { t } = useTranslation('common');
  const { mutate, isLoading } = useMutation(
    client.users.resendVerificationEmail,
    {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(t('PICKBAZAR_MESSAGE.EMAIL_SENT_SUCCESSFUL'));
        }
      },
      onError: (error) => {
        const {
          response: { data },
        }: any = error ?? {};

        toast.error(data?.message);
      },
    }
  );

  return { mutate, isLoading };
}

export function LogOut(){
  const queryClient = useQueryClient();
  const { setToken } = useToken();
  const [_, setAuthorized] = useAtom(authorizationAtom);
  const [_r, resetCheckout] = useAtom(clearCheckoutAtom);

  setToken('')
  setAuthorized(false)
  resetCheckout();
  // queryClient.clear()
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { setToken } = useToken();
  const [_, setAuthorized] = useAtom(authorizationAtom);
  const [_r, resetCheckout] = useAtom(clearCheckoutAtom);

  const { mutate: signOut, isLoading } = useMutation(client.users.logout, {
    onSuccess: (data) => {
      if (data) {
        setToken('');
        setAuthorized(false);
        //@ts-ignore
        resetCheckout();
        queryClient.refetchQueries(API_ENDPOINTS.USERS_ME);
      }
    },
    onSettled: () => {
      queryClient.clear();
    },
  });
  function handleLogout() {
    socialLoginSignOut({ redirect: false });
    signOut();
  }
  return {
    mutate: handleLogout,
    isLoading,
  };
}

export function useChangePassword() {
  const { t } = useTranslation('common');
  let [formError, setFormError] =
    useState<Partial<ChangePasswordUserInput> | null>(null);

  const { mutate, isLoading } = useMutation(client.users.changePassword, {
    onSuccess: (data) => {
      if (!data?.status) {
        setFormError({
          oldPassword: data?.message ?? '',
        });
        return;
      }
      toast.success(`${t('password-successful')}`);
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      setFormError(data);
    },
  });

  return { mutate, isLoading, formError, setFormError };
}

export function useForgotPassword() {
  const { actions } = useStateMachine({ updateFormState });
  let [message, setMessage] = useState<string | null>(null);
  let [formError, setFormError] = useState<any>(null);
  const { t } = useTranslation();

  const { mutate, isLoading } = useMutation(client.users.forgotPassword, {
    onSuccess: (data, variables) => {
      if (!data.status==="sucess") {
        setFormError({
          email: data?.message ?? '',
        });
        showToast(data?.message,"error")
        return;
      }
      showToast(data?.message,"success")
      setMessage(data?.message!);
    
      actions.updateFormState({
        email: data.data.email,
        token:data.data.token,
        step: 'Token',
      });
    },
  });

  return { mutate, isLoading, message, formError, setFormError, setMessage };
}

export function useResetPassword() {
  const queryClient = useQueryClient();
  const { openModal } = useModalAction();
  const { actions } = useStateMachine({ updateFormState });

  return useMutation(client.users.resetPassword, {
    onSuccess: (data) => {
      if (data) {
        toast.success('Successfully Reset Password!');
        actions.updateFormState({
          ...initialState,
        });
        openModal('LOGIN_VIEW');
        return;
      }
    },
    onSettled: () => {
      queryClient.clear();
    },
  });
}

export function useVerifyForgotPasswordToken() {
  const { actions } = useStateMachine({ updateFormState });
  const queryClient = useQueryClient();
  let [formError, setFormError] = useState<any>(null);

  const { mutate, isLoading } = useMutation(
    client.users.verifyForgotPasswordToken,
    {
      onSuccess: (data, variables) => {
        if (!data.success==="success") {
          setFormError({
            token: data?.message ?? '',
          });
          showToast(data?.message,"error")
          return;
        }
        actions.updateFormState({
          step: 'Password',
          token: data?.data?.token as string,
        });
        showToast(data?.message,"success")
      },
      onError:(error:any)=>{
        setFormError({token:error?.response?.data?.message})
        showToast(error?.response?.data?.message,"error")
      },
      onSettled: () => {
        queryClient.clear();
      },
    }
  );

  return { mutate, isLoading, formError, setFormError };
}
