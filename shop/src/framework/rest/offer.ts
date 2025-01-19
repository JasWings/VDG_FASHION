import { useQuery, useMutation, useQueryClient } from 'react-query';
import client from './client';
import { API_ENDPOINTS } from './client/api-endpoints';
import { toast } from 'react-toastify';

export function useOffers(params?: any) {
  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.OFFERS, params],
    () => client.offers.all(params)
  );

  return {
    offers: data?.data ?? [],
    isLoading,
    error,
  };
}

export function useOffer({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.OFFERS, id],
    () => client.offers.get({ id })
  );

  return {
    offer: data ?? null,
    isLoading,
    error,
  };
}

export function useCreateOffer() {
  const queryClient = useQueryClient();
  const { mutate: createOffer, isLoading } = useMutation(client.offers.create, {
    onSuccess: () => {
      toast.success('Offer created successfully!');
      queryClient.invalidateQueries(API_ENDPOINTS.OFFERS);
    },
    onError: () => {
      toast.error('Failed to create offer.');
    },
  });

  return {
    createOffer,
    isLoading,
  };
}

export function useUpdateOffer() {
  const queryClient = useQueryClient();
  const { mutate: updateOffer, isLoading } = useMutation(client.offers.update, {
    onSuccess: () => {
      toast.success('Offer updated successfully!');
      queryClient.invalidateQueries(API_ENDPOINTS.OFFERS);
    },
    onError: () => {
      toast.error('Failed to update offer.');
    },
  });

  return {
    updateOffer,
    isLoading,
  };
}

export function useDeleteOffer() {
  const queryClient = useQueryClient();
  const { mutate: deleteOffer, isLoading } = useMutation(client.offers.delete, {
    onSuccess: () => {
      toast.success('Offer deleted successfully!');
      queryClient.invalidateQueries(API_ENDPOINTS.OFFERS);
    },
    onError: () => {
      toast.error('Failed to delete offer.');
    },
  });

  return {
    deleteOffer,
    isLoading,
  };
}
