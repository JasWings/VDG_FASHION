import { Routes } from '@/config/routes';
import { AUTH_TOKEN_KEY } from '@/lib/constants';
import type { SearchParamOptions } from '@/types';
import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 5000000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Change request data/error here
Axios.interceptors.request.use((config) => {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  if (token) {
    config.headers['Authorization'] = `Token ${token ? token : ''}`;
  }

  
  return config;
});
console.log(process.env.NEXT_PUBLIC_REST_API_ENDPOINT)
// Change response data/error here
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response &&
        error.response.data.message === 'PICKBAZAR_ERROR.NOT_AUTHORIZED')
    ) {
      Cookies.remove(AUTH_TOKEN_KEY);
      Router.replace(Routes.home);
    }
    return Promise.reject(error);
  }
);

export class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response:any = await Axios.get<T>(url, { params });
    return response.data.results?response.data.results:response.data;
}

  static async getProducts<T>(url: string, params?: unknown) {
    const response:any = await Axios.get<T>(url, { params });
    return response?.data;
  }

  static async getProductVariant<T>(url: string, params?: unknown) {
    const response:any = await Axios.get<T>(url, { params });
    return response?.data;
  }
  
  static async getUserInfo<T>(url: string, params?: unknown) {
    const response:any = await Axios.get<T>(url, { params });
    return response.data.data;
  }
  
  static async getUniqueProduct<T>(url: string, params?: unknown) {
    const response = await Axios.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    console.log(data,url)
    const response = await Axios.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await Axios.put<T>(url, data);
    return response.data;
  }
  
  static async Update(url:any,data:any){
    const response=await Axios.patch(url,data)
    return response.data
  }

  static async delete<T>(url: string) {
    const response = await Axios.delete<T>(url);
    return response.data;
  }

  static formatSearchParams(params: Partial<SearchParamOptions>) {
    return Object.entries(params)
      .filter(([, value]) => Boolean(value))
      .map(([k, v]) =>
        ['type', 'categories', 'tags', 'author', 'manufacturer'].includes(k)
          ? `${k}.slug:${v}`
          : `${k}:${v}`
      )
      .join(';');
  }
}
