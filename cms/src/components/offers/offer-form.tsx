import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import Input from '@/components/ui/input';
import TextArea from '@/components/ui/text-area';
import SelectInput from '@/components/ui/select-input';
import { DatePicker } from '@/components/ui/date-picker';
import SwitchInput from '@/components/ui/switch-input';
import Button from '@/components/ui/button';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { offerValidationSchema } from './offer-validation-schema';
import { useProductsQuery } from '@/data/product';
import { useCreateOfferMutation, useUpdateOfferMutation } from "@/data/offer"
import Label from '../ui/label';
import { ValidationError } from 'yup';

type FormValues = {
  title: string;
  description?: string;
  offerType: string;
  applicableProducts: string[];
  freeProducts?: string[];
  minimumPurchaseAmount?: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
};

const defaultValues: FormValues = {
  title: '',
  description: '',
  offerType: '',
  applicableProducts: [],
  freeProducts: [],
  minimumPurchaseAmount: 0,
  startDate: new Date(),
  endDate: new Date(),
  isActive: true,
};

type IProps = {
  initialValues?: FormValues;
};

export default function CreateOrUpdateOfferForm({ initialValues }: IProps) {
  const router = useRouter();
  const initialFormValues = initialValues
  ? {
      ...initialValues,
      startDate: initialValues.startDate ? new Date(initialValues.startDate) : new Date(),
      endDate: initialValues.endDate ? new Date(initialValues.endDate) : new Date(),
    }
  : defaultValues;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialFormValues,
    resolver: yupResolver(offerValidationSchema),
  });

  const {  products, isLoading: loadingProducts } = useProductsQuery();
  const { mutate: createOffer, isLoading: creating } = useCreateOfferMutation();
  const { mutate: updateOffer, isLoading: updating } = useUpdateOfferMutation();

  const onSubmit = (values: FormValues) => {
    const transformedValues = {
      ...values,
      offerType: values.offerType.value,
      applicableProducts: values.applicableProducts.map((product) => product.value),
      freeProducts: values.freeProducts?.map((product) => product.value),
    };
  
    if (initialValues) {
      updateOffer({ ...transformedValues, id: initialValues.id });
    } else {
      createOffer(transformedValues);
    }
  };
  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title="Offer Details"
          details="Provide the details of the offer including title, type, applicable products, and more."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Title"
            {...register('title')}
            error={errors.title?.message}
            variant="outline"
            className="mb-5 p-3"
          />
          <TextArea
            label="Description"
            {...register('description')}
            error={errors.description?.message}
            variant="outline"
            className="mb-5 p-3"
          />
          <div className="mb-5">
            <Label>{'Offer Type'}</Label>
            <SelectInput
            label="Offer Type"
            options={[
              { label: 'Buy One Get One', value: 'BOGO' },
              { label: 'Discount', value: 'DISCOUNT' },
            ]}
            name="offerType"
            control={control}
            error={errors.offerType?.message}
            className="p-3 mb-5"
          />
          </div>
          <div className="mb-5">
            <Label>{'Applicable Products'}</Label>
            <SelectInput
            label="Applicable Products"
            options={products?.map((product) => ({
              label: product.name,
              value: product._id,
            }))}
            name="applicableProducts"
            control={control}
            isMulti
            isLoading={loadingProducts}
            error={errors.applicableProducts?.message}
            className="p-3 mb-5"
          />
          </div>
          <div className="mb-5">
            <Label>{'Free Products (Optional)'}</Label>
            <SelectInput
            label="Free Products (Optional)"
            options={products?.map((product) => ({
              label: product.name,
              value: product._id,
            }))}
            name="freeProducts"
            control={control}
            isMulti
            isLoading={loadingProducts}
            error={errors.freeProducts?.message}
            className="p-3 mb-5"
          />
          </div>
          
          
          <Input
            label="Minimum Purchase Amount"
            type="number"
            {...register('minimumPurchaseAmount')}
            error={errors.minimumPurchaseAmount?.message}
            variant="outline"
            className="mb-5 p-3"
          />
           <div className="flex flex-col sm:flex-row">
            <div className="mb-5 w-full p-0 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Label>{'Start Date'}</Label>

              <Controller
                control={control}
                name="startDate"
                render={({ field: { onChange, onBlur, value } }) => (
                  //@ts-ignore
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    selectsStart
                    minDate={new Date()}
                    className="border border-border-base"
                  />
                )}
              />
              {/* <ValidationError message={errors.startDate?.message} /> */}
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Label>{'End Date'}</Label>

              <Controller
                control={control}
                name="endDate"
                render={({ field: { onChange, onBlur, value } }) => (
                  //@ts-ignore
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    selectsEnd
                    className="border border-border-base"
                  />
                )}
              />
              {/* <ValidationError message={t(errors.expire_at?.message!)} /> */}
            </div>
          </div>
          {/* <SwitchInput
            name="isActive"
            control={control}
            label="Is Active"
            error={errors.isActive?.message}
            className="mt-5 p-3"
          /> */}
        </Card>
      </div>

      <div className="mb-4 text-end">
        <Button
          variant="outline"
          onClick={router.back}
          className="me-4"
          type="button"
        >
          Back
        </Button>
        <Button loading={creating || updating}>
          {initialValues ? 'Update Offer' : 'Create Offer'}
        </Button>
      </div>
    </form>
  );
}
