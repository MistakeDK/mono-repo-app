import type { AxiosInstance, AxiosResponse } from 'axios';
import {
  createConfigApi,
  ApiRequestConfig,
  IApiRequest,
  ApiResponse,
} from '@mono/utils';

export const axiosInstanse: AxiosInstance = createConfigApi({
  baseURL: '/api/todo-app',
  timeout: 5000,
});

export const requestApi = (params: ApiRequestConfig) => {
  const url = params.url || '';
  const pathParams = params.pathParams || {};
  if (pathParams && Object.keys(pathParams).length > 0) {
    Object.keys(pathParams).forEach((key) => {
      url.replace(
        `:${key}`,
        encodeURIComponent(String((pathParams as any)[key])),
      );
    });
  }

  return axiosInstanse.request({
    ...params,
    url,
    data: params?.body,
    params: params?.queryParams,
  }) as Promise<ApiResponse<any>>;
};

const login = (
  params: IApiRequest<null, null, null>,
): Promise<ApiResponse<string>> =>
  requestApi({
    url: '',
    method: 'POST',
    ...params,
  });
