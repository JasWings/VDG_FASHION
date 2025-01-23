import Router,{ useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { Routes } from '@/config/routes';
import { API_ENDPOINTS } from './client/api-endpoints';
import { GetParams, Type, TypeQueryOptions } from '@/types';
import { Config } from '@/config';
import { sliderClient } from './client/slider';

export const useCreateSliderMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(sliderClient.create, {
    onSuccess: () => {
      Router.push(Routes.sliders.list, undefined, {
        locale: Config.defaultLanguage,
      });
      toast.success(t('common:successfully-created'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SLIDER);
    },
  });
};

export const useDeleteSliderMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(sliderClient.delete, {
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SLIDER);
    },
  });
};

export const useUpdateSliderMutation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation(sliderClient.update, {
    onSuccess: async (data) => {
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.shop}${Routes.type.list}`
        : Routes.sliders.list;
      await router.push(
        `${generateRedirectUrl}/${data?.slug}/edit`,
        undefined,
        {
          locale: Config.defaultLanguage,
        }
      );
      toast.success(t('common:successfully-updated'));
    },
    // onSuccess: () => {
    //   toast.success(t('common:successfully-updated'));
    // },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SLIDER);
    },
  });
};

export const useSliderQuery = ({ slug, language }: GetParams) => {
  return useQuery<Type, Error>([API_ENDPOINTS.SLIDER, { slug, language }], () =>
    sliderClient.get({ slug, language })
  );
};

export const useSlidersQuery = (options?: Partial<TypeQueryOptions>) => {
  const { data, isLoading, error } = useQuery<any, Error>(
    [API_ENDPOINTS.SLIDER, options],
    ({ queryKey, pageParam }) =>
      sliderClient.all(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
    }
  );

  return {
    types: data?.data ?? [],
    loading: isLoading,
    error,
  };
};
