"use client"
import type { CreateContactUsInput } from '@/types';
import Button from '@/components/ui/button';
import { Form } from '@/components/ui/forms/form';
import Input from '@/components/ui/forms/input';
import TextArea from '@/components/ui/forms/text-area';
import { useContact } from '@/framework/user';
import { useTranslation } from 'next-i18next';
import * as yup from 'yup';
import { useGoogleReCaptcha,GoogleReCaptcha } from "react-google-recaptcha-v3";
import { showToast } from '../ui/toast/toast';
import {useState} from "react"
import ReCAPTCHA from "react-google-recaptcha";

const contactFormSchema = yup.object().shape({
  name: yup.string().required('error-name-required'),
  email: yup
    .string()
    .email('error-email-format')
    .required('error-email-required'),
    identity: yup.string().required('error-subject-required'),
  description: yup.string().required('error-description-required'),
});
const ContactForm = () => {
  const { t } = useTranslation('common');
  const { mutate, isLoading } = useContact();
  const {executeRecaptcha}=useGoogleReCaptcha()
  const [recaptchaValue, setRecaptchaValue] = useState('');

//  async function onSubmit(values: CreateContactUsInput) {
//         mutate(values)
//   }

  // const onRecaptchaChange = (value: string | null) => {
  //   if (value) {
  //     setRecaptchaValue(value);
  //   }
  // };

  const onRecaptchaChange = async () => {
    const token = await executeRecaptcha('contact_form');
    setRecaptchaValue(token);
  };

  async function onSubmit(values: CreateContactUsInput) {
    if(executeRecaptcha){
      const token = await executeRecaptcha('contact_form');
      const dataWithCaptcha = {
        ...values,
        captchaToken: token,
      };
      mutate(dataWithCaptcha);
    }
    // if (recaptchaValue) {
    //   const dataWithCaptcha = {
    //     ...values,
    //     captchaToken: recaptchaValue,
    //   };
    //   mutate(dataWithCaptcha);
    // } else {
    //   showToast("Captcha is required", "error");
    // }
  }


  return (
    <Form<CreateContactUsInput>
      onSubmit={onSubmit}
      validationSchema={contactFormSchema}
    >
      {({ register, formState: { errors } }) => (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label={t('text-name')}
              {...register('name')}
              variant="outline"
              error={t(errors.name?.message!)}
            />
            <Input
              label={t('text-email')}
              {...register('email')}
              type="email"
              variant="outline"
              error={t(errors.email?.message!)}
            />
          </div>
          <Input
            label={t('text-subject')}
            {...register('identity')}
            variant="outline"
            className="my-6"
            error={t(errors.identity?.message!)}
          />
          <TextArea
            label={t('text-description')}
            {...register('description')}
            variant="outline"
            className="my-6"
            error={t(errors.description?.message!)}
          />
          <div>
      </div>
          {/* <GoogleReCaptcha
          onVerify={(value)=>onRecaptchaChange(value)}
          /> */}
          <Button loading={isLoading}  disabled={isLoading}  >
            {t('text-submit')}
          </Button>
        </>
      )}
    </Form>
  );
};

export default ContactForm;
