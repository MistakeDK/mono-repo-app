import { AxiosRequestConfig, Method } from 'axios';

type BaseRequestConfig = Omit<
  AxiosRequestConfig,
  'url' | 'method' | 'params' | 'data'
>;

type WithPath<P> = P extends null ? object : { pathParams: P };
type WithQuery<Q> = Q extends null ? object : { queryParams: Q };
type WithBody<B> = B extends null ? object : { body: B };

export interface ApiRequestConfig<P = any, Q = any, B = any>
  extends Omit<AxiosRequestConfig, 'url' | 'method' | 'params' | 'data'> {
  method: Method;
  url: string;
  pathParams?: P extends null ? undefined : P;
  queryParams?: Q extends null ? undefined : Q;
  body?: B extends null ? undefined : B;
}

export type IApiRequest<P = null, Q = null, B = null> = BaseRequestConfig &
  WithPath<P> &
  WithQuery<Q> &
  WithBody<B>;

export type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};
