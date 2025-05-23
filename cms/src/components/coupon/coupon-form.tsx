import Input from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker } from '@/components/ui/date-picker';
import Button from '@/components/ui/button';
import TextArea from '@/components/ui/text-area';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import Label from '@/components/ui/label';
import Radio from '@/components/ui/radio/radio';
import { useRouter } from 'next/router';
import ValidationError from '@/components/ui/form-validation-error';
import { useSettings } from '@/contexts/settings.context';
import { useTranslation } from 'next-i18next';
import FileInput from '@/components/ui/file-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { couponValidationSchema } from './coupon-validation-schema';
import { AttachmentInput, Coupon, CouponType, ItemProps } from '@/types';
import {
  useCreateCouponMutation,
  useUpdateCouponMutation,
} from '@/data/coupon';
import { getErrorMessage } from '@/utils/form-error';
import { Config } from '@/config';
import { useModalAction } from '../ui/modal/modal.context';
import { useSettingsQuery } from '@/data/settings';
import { useCallback, useMemo } from 'react';
import OpenAIButton from '../openAI/openAI.button';

export const chatbotAutoSuggestion = ({ name }: { name: string }) => {
  return [
    {
      id: 1,
      title: `Write a description that highlights the exclusive savings and irresistible discounts of our new coupon ${name}.`,
    },
    {
      id: 2,
      title: `Craft a compelling description showcasing the value and benefits customers can enjoy with our exciting new coupon.`,
    },
    {
      id: 3,
      title: `Develop a captivating description introducing our latest coupon, designed to help shoppers save big on their favorite products.`,
    },
    {
      id: 4,
      title: `Create a description that presents our new coupon as a gateway to incredible savings and unbeatable deals.`,
    },
    {
      id: 5,
      title: `Shape a concise description highlighting the convenience and potential savings customers can unlock with our innovative coupon.`,
    },
    {
      id: 6,
      title: `Craft an enticing description showcasing the wide range of products and services eligible for discounts with our new coupon.`,
    },
    {
      id: 7,
      title: `Build a compelling description emphasizing the limited-time nature and exclusive offers available through our new coupon.`,
    },
    {
      id: 8,
      title: `Design a concise description introducing our new coupon as a must-have for savvy shoppers looking to stretch their budget.`,
    },
    {
      id: 9,
      title: `Write an engaging description highlighting the fantastic opportunities for savings and value provided by our new coupon.`,
    },
    {
      id: 10,
      title: `Develop a captivating description that presents our new coupon as a game-changer, delivering incredible discounts and incredible value.`,
    },
  ];
};

type FormValues = {
  code: string;
  type: CouponType;
  description: string;
  amount: number;
  minimum_cart_amount: number;
  image: AttachmentInput;
  active_from: string;
  expire_at: string;
};

const defaultValues = {
  image: '',
  type: CouponType.FIXED,
  amount: 0,
  minimum_cart_amount: 0,
  active_from: new Date(),
};

type IProps = {
  initialValues?: Coupon;
};
export default function CreateOrUpdateCouponForm({ initialValues }: IProps) {
  const router = useRouter();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
          active_from: new Date(initialValues.active_from!),
          expire_at: new Date(initialValues.expire_at!),
        }
      : defaultValues,
    resolver: yupResolver(couponValidationSchema),
  });
  const { currency } = useSettings();
  const { mutate: createCoupon, isLoading: creating } =
    useCreateCouponMutation();
  const { mutate: updateCoupon, isLoading: updating } =
    useUpdateCouponMutation();

    const { openModal } = useModalAction();
    const {
      // @ts-ignore
      settings: { options },
    } = useSettingsQuery({
      language: locale!,
    });
  
    const generateName = watch('code');
    const autoSuggestionList = useMemo(() => {
      return chatbotAutoSuggestion({ name: generateName ?? '' });
    }, [generateName]);
  
    const handleGenerateDescription = useCallback(() => {
      openModal('GENERATE_DESCRIPTION', {
        control,
        name: generateName,
        set_value: setValue,
        key: 'description',
        suggestion: autoSuggestionList as ItemProps[],
      });
    }, [generateName]);

  const [active_from, expire_at] = watch(['active_from', 'expire_at']);
  const couponType = watch('type');

  const isTranslateCoupon = router.locale !== Config.defaultLanguage;

  const onSubmit = async (values: FormValues) => {
    const input = {
      // language: router.locale,
      type: values.type,
      description: values.description,
      amount: values.amount,
      minimum_cart_amount: values.minimum_cart_amount,
      active_from: new Date(values.active_from).toISOString(),
      expire_at: new Date(values.expire_at).toISOString(),
      image: values?.image.file,
    };

    try {
      if (
        !initialValues ||
        !initialValues.translated_languages.includes(router.locale!)
      ) {
        createCoupon({
          ...input,
          code: values.code,
          ...(initialValues?.code && { code: initialValues.code }),
        });
      } else {
        updateCoupon({
          ...input,
          ...(initialValues.code !== values.code && { code: values.code }),
          id: initialValues.id!,
        });
      }
    } catch (error) {
      const serverErrors = getErrorMessage(error);
      Object.keys(serverErrors?.validation).forEach((field: any) => {
        setError(field.split('.')[1], {
          type: 'manual',
          message: serverErrors?.validation[field][0],
        });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:coupon-image-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
        </Card>
      </div>

      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:coupon-form-info-help-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-code')}
            {...register('code')}
            error={t(errors.code?.message!)}
            variant="outline"
            className="mb-5"
            disabled={isTranslateCoupon}
          />

          <div className="relative">
            {/* {options?.useAi && (
              <OpenAIButton
                title="Generate Description With AI"
                onClick={handleGenerateDescription}
              />
            )} */}
            <TextArea
              label={t('form:input-label-description')}
              {...register('description')}
              variant="outline"
              className="mb-5"
            />
          </div>

          <div className="mb-5">
            <Label>{t('form:input-label-type')}</Label>
            <div className="space-y-3.5">
              <Radio
                label={t('form:input-label-fixed')}
                {...register('type')}
                id="fixed"
                value={CouponType.FIXED}
                error={t(errors.type?.message!)}
              />
              <Radio
                label={t('form:input-label-percentage')}
                {...register('type')}
                id="percentage"
                value={CouponType.PERCENTAGE}
              />
              <Radio
                label={t('form:input-label-free-shipping')}
                {...register('type')}
                id="free_shipping"
                value={CouponType.FREE_SHIPPING}
              />
            </div>
          </div>

          {couponType !== CouponType.FREE_SHIPPING && (
            <Input
              label={`${t('form:coupon-input-label-amount')} (${currency})`}
              {...register('amount')}
              type="number"
              error={t(errors.amount?.message!)}
              variant="outline"
              className="mb-5"
              disabled={isTranslateCoupon}
            />
          )}
          <Input
            label={`${t('form:input-label-minimum-cart-amount')} (${currency})`}
            {...register('minimum_cart_amount')}
            type="number"
            error={t(errors.minimum_cart_amount?.message!)}
            variant="outline"
            className="mb-5"
            disabled={isTranslateCoupon}
          />
          <div className="flex flex-col sm:flex-row">
            <div className="mb-5 w-full p-0 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Label>{t('form:coupon-active-from')}</Label>

              <Controller
                control={control}
                name="active_from"
                render={({ field: { onChange, onBlur, value } }) => (
                  //@ts-ignore
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    selectsStart
                    minDate={new Date()}
                    maxDate={expire_at}
                    startDate={active_from}
                    endDate={expire_at}
                    className="border border-border-base"
                    disabled={isTranslateCoupon}
                  />
                )}
              />
              <ValidationError message={t(errors.active_from?.message!)} />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Label>{t('form:coupon-expire-at')}</Label>

              <Controller
                control={control}
                name="expire_at"
                render={({ field: { onChange, onBlur, value } }) => (
                  //@ts-ignore
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    selectsEnd
                    startDate={active_from}
                    endDate={expire_at}
                    minDate={active_from}
                    className="border border-border-base"
                    disabled={isTranslateCoupon}
                  />
                )}
              />
              <ValidationError message={t(errors.expire_at?.message!)} />
            </div>
          </div>
        </Card>
      </div>
      <div className="mb-4 text-end">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t('form:button-label-back')}
          </Button>
        )}

        <Button loading={updating || creating}>
          {initialValues
            ? t('form:button-label-update-coupon')
            : t('form:button-label-add-coupon')}
        </Button>
      </div>
    </form>
  );
}
