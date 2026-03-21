import { type AxiosInstance } from 'axios';
import { ApiRequestConfig, createConfigApi } from '@mono/utils';

const axiosClient: AxiosInstance = createConfigApi({
  baseURL: '/api',
  timeout: 10000,
});

const formatPathVariables = (
  url: string,
  pathParams?: Record<string, string | number>,
): string => {
  if (!pathParams) return url;

  return Object.entries(pathParams).reduce((acc, [key, value]) => {
    return acc.replace(`:${key}`, String(value));
  }, url);
};

export const apiService = async (params: ApiRequestConfig) => {
  const { body, pathParams, queryParams, url = '' } = params;

  const formattedUrl = formatPathVariables(url, pathParams);

  return axiosClient({
    ...params,
    baseURL: '/api',
    url: formattedUrl,
    params: queryParams,
    data: body,
  });
};
