import type { Type, TypeQueryOptions } from '@/types';
import { useQuery } from 'react-query';
import client from './client';
import { API_ENDPOINTS } from './client/api-endpoints';
import { useRouter } from 'next/router';

export function useSliders(options?: Partial<TypeQueryOptions>) {
  const { locale } = useRouter();

  let formattedOptions = {
    ...options,
    language: locale
  }

  const { data, isLoading, error } = useQuery<Type[], Error>(
    [API_ENDPOINTS.TYPES, formattedOptions],
    ({ queryKey }) => client.sliders.all(Object.assign({}, queryKey[1]))
  );
  return {
    sliders: data,
    isLoading,
    error,
  };
}
