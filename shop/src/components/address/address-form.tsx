import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import Label from '@/components/ui/forms/label';
import Radio from '@/components/ui/forms/radio/radio';
import { useTranslation } from 'next-i18next';
import * as yup from 'yup';
import { useModalState } from '@/components/ui/modal/modal.context';
import { Form } from '@/components/ui/forms/form';
import { AddressType } from '@/framework/utils/constants';
import { useUpdateAddress } from '@/framework/user';
import { useUser } from '@/framework/user';
import TextArea from '../ui/forms/text-area';
import { useCart } from '@/store/quick-cart/cart.context';

type FormValues = {
  type: AddressType;
  address: {
    address_line_1:string,
    address_line_2:string;
    address_line_3:string;
    // country: number;
    city: string;
    state: string;
    pin_code: string;
    street_address: string;
  };
  remarks:string;

};

const addressSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf([AddressType.Billing, AddressType.Shipping,AddressType.Same])
    .required('error-type-required'),
  address: yup.object().shape({
    address_line_1:yup.string().required("addres line 1 required"),
    address_line_2:yup.string(),
    address_line_3:yup.string(),
    // country: yup.number().required('error-country-required'),
    city: yup.string().default("city"),
    state: yup.string().default("state"),
    pin_code: yup.string().default("600024"),
    // remarks:yup.string().required("message required")
  }),
});

export const AddressForm: React.FC<any> = ({
  onSubmit,
  defaultValues,
  isLoading,
}) => {
  const { t } = useTranslation('common');
  const {me}=useUser()
  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      className="grid h-full grid-cols-2 gap-5"
      //@ts-ignore
      validationSchema={addressSchema}
      useFormProps={{
        shouldUnregister: true,
        defaultValues,
      }}
      resetValues={defaultValues}
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => {
        return (
          <>
            <div>
              <Label>{t('text-type')}</Label>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Radio
                  id="billing"
                  {...register('type')}
                  type="radio"
                  value={AddressType.Billing}
                  label={t('text-billing')}
                />
                <Radio
                  id="shipping"
                  {...register('type')}
                  type="radio"
                  value={AddressType.Shipping}
                  label={t('text-shipping')}
                />
                {/* <Radio
                  id="same"
                  {...register('type')}
                  type="radio"
                  value={AddressType.Same}
                  label={"same"}
                /> */}
              </div>
            </div>

            <Input
              label={"Address Line 1"}
              {...register('address.address_line_1')}
              error={t(errors.address?.address_line_1?.message!)}
              variant="outline"
              className="col-span-2"
            />
              <Input
              label={"Address Line 2"}
              {...register('address.address_line_2')}
              error={t(errors.address?.address_line_2?.message!)}
              variant="outline"
              className="col-span-2"
            />
            <Input
            label={"Address Line 3"}
            {...register('address.address_line_3')}
            error={t(errors.address?.address_line_3?.message!)}
            variant="outline"
            className="col-span-2"
            />
            {/* <Input
              label={t('text-country')}
              // {...register(me?.country?.id)}
              error={t(errors.address?.country?.message!)}
              variant="outline"
              value={me.country.identity==="US"?"United States":me?.country?.identity}
              readOnly
            /> */}

            <Input
              label={t('text-city')}
              {...register('address.city')}
              error={t(errors.address?.city?.message!)}
              variant="outline"
              // value={}
            />

            <Input
              label={t('text-state')}
              {...register('address.state')}
              error={t(errors.address?.state?.message!)}
              variant="outline"
              // value={"state"}
            />

            <Input
              label={t('text-zip')}
              {...register('address.pin_code')}
              error={t(errors.address?.pin_code?.message!)}
              variant="outline"
              // value={"620004"}
            />

            {/* <TextArea
              label={"message"}
              {...register('address.remarks')}
              error={t(errors.address?.remarks?.message!)}
              variant="outline"
              className="col-span-2"
            /> */}

            <Button
              className="w-full col-span-2"
              loading={isLoading}
              disabled={isLoading}
            >
              {Boolean(defaultValues) ? t('text-update') : t('text-save')}{' '}
              {t('text-address')}
            </Button>
          </>
        );
      }}
    </Form>
  );
};

export default function CreateOrUpdateAddressForm() {
  const { t } = useTranslation('common');
  const {
    data: { customerId, address, type },
  } = useModalState();
  const {me}=useUser()

  const { mutate: updateProfile } = useUpdateAddress();

  const onSubmit = (values: FormValues) => {
    if(values.type==="same"){
      const formattedInput = {
        first_name:me.first_name,
        last_name:me.last_name,
        phone_number:me.phone_number,
        landmark:values.address.city,
         country:me.country.id,
         remarks:"remarks",
        address_type: "shipping",
        ...values.address,
      };
      const formattedInput1 = {
        first_name:me.first_name,
        last_name:me.last_name,
        phone_number:me.phone_number,
        landmark:values.address.city,
        country:me.country.id,
        remarks:"remarks",
        address_type: "billing",
        ...values.address,
      };
      updateProfile(formattedInput);
      updateProfile(formattedInput1)
    }else {
       const formattedInput = {
       first_name:me.first_name,
       last_name:me.last_name,
       phone_number:me.phone_number,
       landmark:"landmark",
       address_type: values.type,
        address_line_1: values?.address?.address_line_1,
        address_line_2: values?.address?.address_line_2,
        address_line_3: values?.address?.address_line_3,
        city: values?.address?.city||"city",
        state:values?.address?.state || "state",
        pin_code: values?.address?.pin_code || "000000",
       remarks:"remarks",
     };
     console.log(formattedInput,"formattedInput")
     updateProfile(formattedInput);
    }
  };

  return (
    <div className="min-h-screen p-5 bg-light sm:p-8 md:min-h-0 md:rounded-xl">
      <h1 className="mb-4 text-lg font-semibold text-center text-heading sm:mb-6">
        {address ? t('text-update') : t('text-add-new')} {t('text-address')}
      </h1>
      <AddressForm
        onSubmit={onSubmit}
        defaultValues={{
          address_type: address?.type ?? type,
          city: address?.address?.city ?? 'city',
          remarks: address?.address?.remarks ?? '',
          state: address?.address?.state ?? '',
          pin_code: address?.address?.zip ?? '',
          address_line_1:address?.address?.address_line_1??'',
          address_line_2:address?.address?.address_line_2??'',
          address_line_3:address?.address?.address_line_3??'',
          ...address?.address,
        }}
        
      />
    </div>
  );
}
