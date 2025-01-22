import Input from '@/components/ui/input';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import { useRouter } from 'next/router';
import Label from '@/components/ui/label';
import { typeIconList } from './group-icons';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {  sliderValidationSchema } from './slider-validation-schema';
import SelectInput from '@/components/ui/select-input';
import FileInput from '@/components/ui/file-input';
import Checkbox from '@/components/ui/checkbox/checkbox';
import { useCreateTypeMutation, useUpdateTypeMutation } from '@/data/type';
import {  useCreateSliderMutation, useUpdateSliderMutation } from '@/data/slider';
import { Config } from '@/config';
import { useState } from 'react';
import { AttachmentInput } from '@/types';


type FormValues = {
  name: string;
  slug?: string | null;
  // icon?: any;
  promotional_sliders: AttachmentInput[];
  // linkType?: 'product' | 'category' | 'external';
  // linkTarget?: string;
  // priority?: number;
  isActive?: boolean;
  // startDate?: Date;
  // endDate?: Date;
};

type IProps = {
  initialValues?: any | null;
};

export default function CreateOrUpdateSliderForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const [isSlugDisable, setIsSlugDisable] = useState<boolean>(true);
  const isSlugEditable =
    router?.query?.action === 'edit' &&
    router?.locale === Config.defaultLanguage;
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    resolver: yupResolver(sliderValidationSchema),
    defaultValues: {
      ...initialValues,
      images: initialValues?.images || [],
      // banners: initialValues?.banners || [],
      // linkType: initialValues?.linkType || 'product',
      // linkTarget: initialValues?.linkTarget || '',
      // priority: initialValues?.priority || 0,
      isActive: initialValues?.isActive ?? true,
      // startDate: initialValues?.startDate || '',
      // endDate: initialValues?.endDate || '',
    },
  });
  console.log(errors,"errrrr")

  const { mutate: createType, isLoading: creating } = useCreateSliderMutation();
  const { mutate: updateType, isLoading: updating } = useUpdateSliderMutation();

  const onSubmit = (values: FormValues) => {
    console.log(values,"values")
    const input = {
      language: router.locale,
      name: values.name!,
      slug: values.slug ? values?.slug : values?.name?.toLocaleLowerCase(),
      images: values.promotional_sliders?.map(({ file, id }: any) => ({
        file,
        id,
      })),
      // linkType: values.linkType,
      // linkTarget: values.linkTarget,
      // priority: values.priority,
      isActive: values.isActive,
      // startDate: values.startDate,
      // endDate: values.endDate,
    };

    if (!initialValues) {
      createType({ ...input });
    } else {
      updateType({ ...input, id: initialValues.id, _id: initialValues?._id });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:item-description')}
          details={`${initialValues ? 'update' : 'add'} slider`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />

          {/* <div className="my-5">
            <Label>{t('form:input-label-link-type')}</Label>
            <SelectInput
              name="linkType"
              control={control}
              options={[
                { value: 'product', label: t('form:link-type-product') },
                { value: 'category', label: t('form:link-type-category') },
                { value: 'external', label: t('form:link-type-external') },
              ]}
              isClearable={false}
            />
          </div> */}

          {/* <Input
            label={t('form:input-label-link-target')}
            {...register('linkTarget')}
            error={t(errors.linkTarget?.message!)}
            variant="outline"
            className="mb-5"
          />

          <Input
            label={t('form:input-label-priority')}
            type="number"
            {...register('priority')}
            error={t(errors.priority?.message!)}
            variant="outline"
            className="mb-5"
          /> */}

          <Checkbox
            {...register('isActive')}
            label={'active'}
            className="mb-5"
          />

          {/* <Input
            label={t('form:input-label-start-date')}
            type="date"
            {...register('startDate')}
            error={t(errors.startDate?.message!)}
            variant="outline"
            className="mb-5"
          />

          <Input
            label={t('form:input-label-end-date')}
            type="date"
            {...register('endDate')}
            error={t(errors.endDate?.message!)}
            variant="outline"
            className="mb-5"
          /> */}
        </Card>
      </div>

      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:promotional-slider')}
          details={t('form:promotional-slider-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="promotional_sliders" control={control} multiple={true} />
        </Card>
      </div>


      <div className="mb-5 text-right">
        <Button type="submit" loading={creating || updating}>
          {initialValues ? t('Update') : t('Create')}
        </Button>
      </div>
    </form>
  );
}
