import Input from '@/components/ui/input';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import TextArea from '@/components/ui/text-area';
import Label from '@/components/ui/label';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import * as categoriesIcon from '@/components/icons/category';
import { getIcon } from '@/utils/get-icon';
import { useRouter } from 'next/router';
import { getErrorMessage } from '@/utils/form-error';
import ValidationError from '@/components/ui/form-validation-error';
import { tagIcons } from './tag-icons';
import { useTranslation } from 'next-i18next';
import FileInput from '@/components/ui/file-input';
import SelectInput from '@/components/ui/select-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { tagValidationSchema } from './tag-validation-schema';
import { useCreateTagMutation, useUpdateTagMutation } from '@/data/tag';
import { useTypesQuery } from '@/data/type';
import OpenAIButton from '../openAI/openAI.button';
import { useSettingsQuery } from '@/data/settings';
import { useCallback, useMemo, useState } from 'react';
import { ItemProps } from '@/types';
import { useModalAction } from '../ui/modal/modal.context';
import { EditIcon } from '@/components/icons/edit';
import { Config } from '@/config';
import { join, split } from 'lodash';
import { formatSlug } from '@/utils/use-slug';

export const chatbotAutoSuggestion = ({ name }: { name: string }) => {
  return [
    {
      id: 1,
      title: `Discover the magic of ${name} as we curate the finest products for you.`,
    },
    {
      id: 2,
      title: `Elevate your shopping experience with our carefully selected ${name} collection.`,
    },
    {
      id: 3,
      title: `Explore a world of possibilities with our diverse range of ${name} products.`,
    },
    {
      id: 4,
      title: `Experience excellence with our handpicked selection of ${name} items.`,
    },
    {
      id: 5,
      title: `Find your perfect match among our premium ${name} products.`,
    },
    {
      id: 6,
      title: `Simplify your search and find what you need with our intuitive ${name} category.`,
    },
    {
      id: 7,
      title: `Embrace style and functionality with our exclusive ${name} product line.`,
    },
    {
      id: 8,
      title: `Enhance your lifestyle with our innovative ${name} offerings.`,
    },
    {
      id: 9,
      title: `Unlock new dimensions of ${name} with our exceptional product assortment.`,
    },
    {
      id: 10,
      title: `Immerse yourself in the world of ${name} and discover unique treasures.`,
    },
  ];
};

function SelectTypes({
  control,
  errors,
}: {
  control: Control<FormValues>;
  errors: FieldErrors;
}) {
  const { locale } = useRouter();
  const { t } = useTranslation();

  const { types, loading } = useTypesQuery({
    limit: 999,
    // type: type?.slug,
    language: locale,
  });
  return (
    <div className="mb-5">
      <Label>{t('form:input-label-types')}</Label>
      <SelectInput
        name="type"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.slug}
        options={types}
        isLoading={loading}
      />
      <ValidationError message={t(errors.type?.message)} />
    </div>
  );
}

export const updatedIcons = tagIcons.map((item: any) => {
  item.label = (
    <div className="flex items-center space-s-5">
      <span className="flex h-5 w-5 items-center justify-center">
        {getIcon({
          iconList: categoriesIcon,
          iconName: item.value,
          className: 'max-h-full max-w-full',
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

type FormValues = {
  name: string;
  slug: string;
  type: any;
  details: string;
  image: any;
  icon: any;
  identity: any
};

const defaultValues = {
  image: '',
  name: '',
  slug: '',
  details: '',
  icon: '',
  type: '',
};

type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdateTagForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const isNewTranslation = router?.query?.action === 'translate';
  const [isSlugDisable, setIsSlugDisable] = useState<boolean>(true);
  const isSlugEditable =
    router?.query?.action === 'edit' &&
    router?.locale === Config.defaultLanguage;
  console.log(initialValues)
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
          name: initialValues?.identity,
          icon: initialValues?.icon,
          type: initialValues?.group
            // ? tagIcons.find(
            //     (singleIcon) => singleIcon.value === initialValues?.icon!
            //   )
            // : '',
          // ...(isNewTranslation && {
          //   type: null,
          // }),
        }
      : defaultValues,

    resolver: yupResolver(tagValidationSchema),
  });

  const { openModal } = useModalAction();
  const { locale } = router;
  const {
    // @ts-ignore
    settings: { options },
  } = useSettingsQuery({
    language: locale!,
  });

  const generateName = watch('name');
  const autoSuggestionList = useMemo(() => {
    return chatbotAutoSuggestion({ name: generateName ?? '' });
  }, [generateName]);

  const handleGenerateDescription = useCallback(() => {
    openModal('GENERATE_DESCRIPTION', {
      control,
      name: generateName,
      set_value: setValue,
      key: 'details',
      suggestion: autoSuggestionList as ItemProps[],
    });
  }, [generateName]);

  const { mutate: createTag, isLoading: creating } = useCreateTagMutation();
  const { mutate: updateTag, isLoading: updating } = useUpdateTagMutation();
  const slugAutoSuggest = formatSlug(watch('name'));
  const onSubmit = async (values: FormValues) => {
    const input = {
      language: router.locale,
      name: values.name,
      slug: values.slug,
      details: values.details,
      image: {
        thumbnail: values?.image?.thumbnail,
        original: values?.image?.original,
        id: values?.image?.id,
      },
      icon: values.icon?.value ?? '',
      type_id: values.type?._id,
    };

    try {
      if (
        !initialValues ||
        !initialValues.translated_languages.includes(router.locale)
      ) {
        console.log(input,slugAutoSuggest)
        const data = {
          identity : input?.name,
          slug : slugAutoSuggest,
          description : input?.details,
          group: input.type_id,
          icon : input.icon
        }
        // createTag({
        //   ...input,
        //   ...(initialValues?.slug && { slug: initialValues.slug }),
        // });
        createTag(data)
      } else {
        updateTag({
          ...input,
          id: initialValues.id!,
        });
      }
    } catch (err) {
      getErrorMessage(err);
    }
  };
  console.log(defaultValues,"defaultValues")
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div className="my-5 flex flex-wrap border-b border-dashed border-gray-300 pb-8 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:tag-image-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
        </Card>
      </div> */}

      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:tag-description-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />

          {isSlugEditable ? (
            <div className="relative mb-5">
              <Input
                label={`${t('Slug')}`}
                {...register('slug')}
                error={t(errors.slug?.message!)}
                variant="outline"
                disabled={isSlugDisable}
              />
              <button
                className="absolute top-[27px] right-px z-10 flex h-[46px] w-11 items-center justify-center rounded-tr rounded-br border-l border-solid border-border-base bg-white px-2 text-body transition duration-200 hover:text-heading focus:outline-none"
                type="button"
                title={t('common:text-edit')}
                onClick={() => setIsSlugDisable(false)}
              >
                <EditIcon width={14} />
              </button>
            </div>
          ) : (
            <Input
              label={`${t('Slug')}`}
              {...register('slug')}
              value={slugAutoSuggest}
              variant="outline"
              className="mb-5"
              disabled
            />
          )}

          <div className="relative">
            {/* {options?.useAi && (
              <OpenAIButton
                title="Generate Description With AI"
                onClick={handleGenerateDescription}
              />
            )} */}

            <TextArea
              label={t('form:input-label-details')}
              {...register('details')}
              variant="outline"
              className="mb-5"
            />
          </div>

          <div className="mb-5">
            <Label>{t('form:input-label-select-icon')}</Label>
            <SelectInput
              name="icon"
              control={control}
              options={updatedIcons}
              isClearable={true}
            />
          </div>
          <SelectTypes control={control} errors={errors} />
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

        <Button loading={creating || updating}>
          {initialValues
            ? t('form:button-label-update-tag')
            : t('form:button-label-add-tag')}
        </Button>
      </div>
    </form>
  );
}
