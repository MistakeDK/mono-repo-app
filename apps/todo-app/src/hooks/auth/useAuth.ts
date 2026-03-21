import { useMutation } from '@tanstack/react-query';

import { IApiRequest } from '@mono/utils';
import { ILoginPayload } from './auth.interface';
import { apiService } from '../../lib/configApi';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (params: IApiRequest<null, null, ILoginPayload>) => {
      return apiService({
        url: '/auth',
        method: 'POST',
        ...params,
      });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (params: IApiRequest<null, null, ILoginPayload>) => {
      return apiService({
        url: '/auth/register',
        method: 'POST',
        ...params,
      });
    },
  });
};
