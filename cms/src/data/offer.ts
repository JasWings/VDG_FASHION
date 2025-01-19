import Router, { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { Routes } from '@/config/routes';
import { API_ENDPOINTS } from './client/api-endpoints';
import {
  Offer,
  OfferPaginator,
  OfferQueryOptions,
  GetParams,
} from '@/types';
import { mapPaginatorData } from '@/utils/data-mappers';
import { offerClient } from './client/offer';
import { Config } from '@/config';

export const useCreateOfferMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(offerClient.create, {
    onSuccess: () => {
      Router.push(Routes.offers.list, undefined, {
        locale: Config.defaultLanguage,
      });
      toast.success(t('common:successfully-created'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.OFFERS);
    },
  });
};

export const useDeleteOfferMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(offerClient.delete, {
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.OFFERS);
    },
  });
};

export const useUpdateOfferMutation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(offerClient.update, {
    onSuccess: async (data) => {
      const generateRedirectUrl = router.query.shop
        ? `/${router.query.shop}${Routes.offer.list}`
        : Routes.offer.list;
      await router.push(
        `${generateRedirectUrl}`,
        undefined,
        {
          locale: Config.defaultLanguage,
        }
      );
      toast.success(t('common:successfully-updated'));
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.OFFERS);
    },
  });
};

export const useOfferQuery = ({ slug, language }: GetParams) => {
  const { data, error, isLoading } = useQuery<Offer, Error>(
    [API_ENDPOINTS.OFFERS, { slug, language }],
    () => offerClient.get({ slug, language })
  );

  return {
    offer: data?.data,
    error,
    isLoading,
  };
};

export const useOffersQuery = (options: Partial<OfferQueryOptions>) => {
  const { data, error, isLoading } = useQuery<OfferPaginator, Error>(
    [API_ENDPOINTS.OFFERS, options],
    ({ queryKey, pageParam }) =>
      offerClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
    }
  );

  return {
    offers: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};
