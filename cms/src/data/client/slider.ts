import { crudFactory } from '@/data/client/curd-factory';
import { CreateTypeInput, QueryOptions, Type, TypeQueryOptions } from '@/types';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { HttpClient } from '@/data/client/http-client';

export const sliderClient = {
  ...crudFactory<Type, QueryOptions, CreateTypeInput>(API_ENDPOINTS.SLIDER),
  all: ({ name, ...params }: Partial<TypeQueryOptions>) => {
    return HttpClient.get<Type[]>(API_ENDPOINTS.SLIDER, {
      searchJoin: 'and',
      ...params,
      search: HttpClient.formatSearchParams({ name }),
    });
  },
};
