import * as yup from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import type {
  ForgotPasswordUserInput,
  ResetPasswordUserInput,
  VerifyForgotPasswordUserInput,
} from '@/types';
import { Form } from '@/components/ui/forms/form';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';

import {
  StateMachineProvider,
  createStore,
  useStateMachine,
  GlobalState,
} from 'little-state-machine';
import { useModalAction } from '@/components/ui/modal/modal.context';
import PasswordInput from '@/components/ui/forms/password-input';
import {
  useForgotPassword,
  useVerifyForgotPasswordToken,
  useResetPassword,
} from '@/framework/user';
import { useTranslation } from 'next-i18next';
import Logo from '@/components/ui/logo';
import Alert from '../ui/alert';
import { ArrowPrevIcon } from '../icons/arrow-prev';
import { ArrowNextIcon } from '../icons/arrow-next';
import MobileOtpInput from 'react-otp-input';
import Label from '@/components/ui/forms/label';
import { Controller } from 'react-hook-form';

const emailFormValidation = yup.object().shape({
  email: yup
    .string()
    .email('error-email-format')
    .required('error-email-required'),
});
const tokenFormValidation = yup.object().shape({
  otp: yup.string().required('error-password-required'),
});
const passwordFormValidation = yup.object().shape({
  password: yup.string().required(),
  conformPassword: yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
  .required('confirm password required')
});

function EmailForm({
  email,
  onSubmit,
  isLoading,
  serverError,
}: {
  email: string;
  onSubmit: SubmitHandler<Pick<ForgotPasswordUserInput, 'email'>>;
  isLoading: boolean;
  serverError: any;
}) {
  const { t } = useTranslation('common');
  return (
    <Form<Pick<ForgotPasswordUserInput, 'email'>>
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: { email },
      }}
      validationSchema={emailFormValidation}
      serverError={serverError && t(serverError)}
      className="text-left"
    >
      {({ register, formState: { errors } }) => (
        <>
          <Input
            label={t('text-email')}
            type="email"
            {...register('email')}
            error={t(errors.email?.message!)}
          />
          <Button
            type="submit"
            className="!mt-5 w-full text-sm tracking-[0.2px] lg:!mt-6"
            loading={isLoading}
            disabled={isLoading}
          >
            {t('text-submit-email')}
            <ArrowNextIcon className="w-5" />
          </Button>
        </>
      )}
    </Form>
  );
}

function TokenForm({
  token,
  onSubmit,
  isLoading,
  serverError,
  handlePrevStep,
}: {
  token: string;
  onSubmit: SubmitHandler<Pick<VerifyForgotPasswordUserInput, 'otp'>>;
  isLoading: boolean;
  serverError: any;
  handlePrevStep: () => void;
}) {
  const { t } = useTranslation('common');
  return (
    <Form<Pick<VerifyForgotPasswordUserInput, 'otp'>>
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: { token },
      }}
      validationSchema={tokenFormValidation}
      serverError={serverError}
    >
      {({ register, formState: { errors } }) => (
        <>
          <Input
            label={t('token-label')}
            {...register('otp')}
            error={t(errors.otp?.message!)}
          />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button
              onClick={handlePrevStep}
              className="order-1 w-full !bg-cyan-500 text-sm tracking-[0.2px] hover:!bg-cyan-600"
            >
              <ArrowPrevIcon className="w-5" />
              {t('text-previous-step')}
            </Button>

            <Button
              className="w-full text-sm tracking-[0.2px] sm:order-2"
              loading={isLoading}
              disabled={isLoading}
            >
              {t('text-submit-token')}
              <ArrowNextIcon className="w-5" />
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
function PasswordForm({
  onSubmit,
  isLoading,
  handlePrevStep,
}: {
  onSubmit: SubmitHandler<Pick<ResetPasswordUserInput, 'password'>>;
  isLoading: boolean;
  handlePrevStep: () => void;
}) {
  const { t } = useTranslation('common');
  return (
    <Form<Pick<ResetPasswordUserInput, 'password'>>
      onSubmit={onSubmit}
      useFormProps={{
        defaultValues: { password: '',conformPassword:'' },
      }}
      validationSchema={passwordFormValidation}
    >
      {({ register, formState: { errors } }) => (
        <>
          <PasswordInput
            label={t('text-new-password')}
            {...register('password')}
            error={t(errors.password?.message!)}
          />
          <PasswordInput
            label={"Confirm Password"}
            {...register("conformPassword")}
            error={t(errors.conformPassword?.message!)}
          />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* <Button
              onClick={handlePrevStep}
              className="order-1 w-full !bg-cyan-500 text-sm tracking-[0.2px] hover:!bg-cyan-600"
            >
              <ArrowPrevIcon className="w-5" />
              {t('text-previous-step')}
            </Button> */}
            <Button
              className="w-full text-sm tracking-[0.2px] sm:order-2"
              loading={isLoading}
              disabled={isLoading}
            >
              {t('text-reset-password')}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}

type OptCodeFormProps = {
  otp: string;
};

interface OtpLoginFormForAllUserProps {
  onSubmit: (formData: any) => void;
  isLoading: boolean;
}

const otpLoginFormSchemaForExistingUser = yup.object().shape({
  otp: yup.string().required('error-code-required'),
});

function OtpCodeForm({
  onSubmit,
  isLoading,
}: OtpLoginFormForAllUserProps) {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();

  return (
    <div className="space-y-5 rounded border border-gray-200 p-5">
      <Form<OptCodeFormProps>
        onSubmit={onSubmit}
        validationSchema={otpLoginFormSchemaForExistingUser}
      >
        {({ control, formState: { errors } }) => (
          <>
            <div className="mb-5">
              <Label>OTP Code</Label>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MobileOtpInput
                    value={value}
                    onChange={onChange}
                    numInputs={6}
                    separator={
                      <span className="hidden sm:inline-block">-</span>
                    }
                    containerStyle="flex items-center justify-between -mx-2"
                    inputStyle="flex items-center justify-center !w-full mx-2 sm:!w-9 !px-0 appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-0 focus:ring-0 border border-border-base rounded focus:border-accent h-12"
                    disabledStyle="!bg-gray-100"
                  />
                )}
                name="otp"
                defaultValue=""
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Button loading={isLoading} disabled={isLoading}>
                {t('text-verify-code')}
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

function RenderFormSteps() {
  const {
    mutate: forgotPassword,
    isLoading,
    message,
    formError,
  } = useForgotPassword();
  const {
    mutate: verifyForgotPasswordToken,
    isLoading: verifying,
    formError: tokenFormError,
  } = useVerifyForgotPasswordToken();
  const { mutate: resetPassword, isLoading: resetting } = useResetPassword();
  // use hook for getting form state and actions
  const { state, actions } = useStateMachine({ updateFormState });

  const emailFormHandle: SubmitHandler<
    Pick<ForgotPasswordUserInput, 'email'>
  > = ({ email }) => {
    forgotPassword({ username:email });
  };

  const passwordFormHandle: SubmitHandler<
    Pick<ResetPasswordUserInput, 'password'>
  > = ({ password,conformPassword }) => {
   resetPassword({ new_password:password,confirm_password:conformPassword, token: state.token, email: state.email });
  };

  const tokenFormHandle: SubmitHandler<
    Pick<VerifyForgotPasswordUserInput, 'otp'>
  > = ({ otp }) => {
    // verifyForgotPasswordToken({ token, email: state.email });
  };
  type otp={
    otp:string
  }
  const otpHandler=(values:otp)=>{
   const otp=values.otp
    verifyForgotPasswordToken({otp,username:state.email})
  }
  function backToPreviousStep(step: GlobalState['step']) {
    actions.updateFormState({
      step,
    });
  }
  return (
    <div>
      {state.step === 'Email' && (
        <EmailForm
          email={state.email}
          onSubmit={emailFormHandle}
          isLoading={isLoading}
          serverError={formError}
        />
      )}
      {state.step === 'Token' && (
        <>
          {/* <Alert className="mb-4" message={message} /> */}
          {/* <TokenForm
            token={state.token}
            onSubmit={tokenFormHandle}
            isLoading={verifying}
            serverError={tokenFormError}
            handlePrevStep={() => backToPreviousStep('Email')}
          /> */}
          <OtpCodeForm 
          isLoading={verifying}
          onSubmit={otpHandler}
          />
        </>
      )}
      {state.step === 'Password' && (
        <>
          <PasswordForm
            onSubmit={passwordFormHandle}
            isLoading={resetting}
            handlePrevStep={() => backToPreviousStep('Token')}
          />
        </>
      )}
    </div>
  );
}
export const initialState: GlobalState = {
  step: 'Email',
  email: '',
  password: '',
  token: '',
};
//@ts-ignore
createStore(initialState);

export const updateFormState = (
  state: typeof initialState,
  payload: {
    step: 'Email' | 'Token' | 'Password';
    [key: string]: string;
  }
) => {
  return {
    ...state,
    ...payload,
  };
};
export default function ForgotUserPassword() {
  const { openModal } = useModalAction();

  return (
    <StateMachineProvider>
      <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
        <div className="flex justify-center">
          <Logo />
        </div>
        <p className="mt-4 mb-7 text-center text-sm leading-relaxed text-body sm:mt-5 sm:mb-10 md:text-base">
          otp will be sent your email for reset password
        </p>
        <RenderFormSteps />
        <div className="relative mt-9 mb-7 flex flex-col items-center justify-center text-sm text-heading sm:mt-11 sm:mb-8">
          <hr className="w-full" />
          <span className="start-2/4 -ms-4 absolute -top-2.5 bg-light px-2">
            Or
          </span>
        </div>
        <div className="text-center text-sm text-body sm:text-base">
          Back to{' '}
          <button
            onClick={() => openModal('LOGIN_VIEW')}
            className="ms-1 font-semibold text-accent underline transition-colors duration-200 hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-0"
          >
            Login
          </button>
        </div>
      </div>
    </StateMachineProvider>
  );
}
