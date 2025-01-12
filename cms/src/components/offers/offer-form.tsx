import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Input from '@/components/ui/input';
import TextArea from '@/components/ui/text-area';
import SelectInput from '@/components/ui/select-input';
import { DatePicker } from '@/components/ui/date-picker';
import SwitchInput from '@/components/ui/switch-input';
import Button from '@/components/ui/button';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { offerValidationSchema } from './category-validation-schema';
import { useProductsQuery } from '@/data/product';
import { useCreateOfferMutation, useUpdateOfferMutation } from "@/data/offer"

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
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues || defaultValues,
    resolver: yupResolver(offerValidationSchema),
  });

  const { data: products, isLoading: loadingProducts } = useProductsQuery();
  const { mutate: createOffer, isLoading: creating } = useCreateOfferMutation();
  const { mutate: updateOffer, isLoading: updating } = useUpdateOfferMutation();

  const onSubmit = (values: FormValues) => {
    if (initialValues) {
      updateOffer({ ...values, id: initialValues.id });
    } else {
      createOffer(values);
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
            className="mb-5"
          />
          <TextArea
            label="Description"
            {...register('description')}
            error={errors.description?.message}
            variant="outline"
            className="mb-5"
          />
          <SelectInput
            label="Offer Type"
            options={[
              { label: 'Buy One Get One', value: 'BOGO' },
              { label: 'Discount', value: 'DISCOUNT' },
            ]}
            name="offerType"
            control={control}
            error={errors.offerType?.message}
          />
          <SelectInput
            label="Applicable Products"
            options={products?.map((product) => ({
              label: product.name,
              value: product.id,
            }))}
            name="applicableProducts"
            control={control}
            isMulti
            isLoading={loadingProducts}
            error={errors.applicableProducts?.message}
          />
          <SelectInput
            label="Free Products (Optional)"
            options={products?.map((product) => ({
              label: product.name,
              value: product.id,
            }))}
            name="freeProducts"
            control={control}
            isMulti
            isLoading={loadingProducts}
            error={errors.freeProducts?.message}
          />
          <Input
            label="Minimum Purchase Amount"
            type="number"
            {...register('minimumPurchaseAmount')}
            error={errors.minimumPurchaseAmount?.message}
            variant="outline"
            className="mb-5"
          />
          <div className="flex gap-5">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start Date"
                  error={errors.startDate?.message}
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End Date"
                  error={errors.endDate?.message}
                />
              )}
            />
          </div>
          <SwitchInput
            name="isActive"
            control={control}
            label="Is Active"
            error={errors.isActive?.message}
            className="mt-5"
          />
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
