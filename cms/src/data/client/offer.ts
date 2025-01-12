import {
    Offer,
    OfferPaginator,
    OfferQueryOptions,
    CreateOfferInput,
    QueryOptions,
  } from '@/types';
  import { API_ENDPOINTS } from './api-endpoints';
  import { crudFactory } from './curd-factory';
  import { HttpClient } from './http-client';
  
  export const offerClient = {
    ...crudFactory<Offer, QueryOptions, CreateOfferInput>(API_ENDPOINTS.OFFERS),
    paginated: ({ title, offerType, ...params }: Partial<OfferQueryOptions>) => {
      return HttpClient.get<OfferPaginator>(API_ENDPOINTS.OFFERS, {
        searchJoin: 'and',
        ...params,
        search: HttpClient.formatSearchParams({ title, offerType }),
      });
    },
  };
  