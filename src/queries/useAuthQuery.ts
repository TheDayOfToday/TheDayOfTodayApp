import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

import type { LoginRequest } from '@/src/service/auth/type';

import { postLogin, getFindEmail, postSendCode, postCheckCode, putResetPassword } from '@/src/service/auth';


export const useFetchToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchToken = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const payload: LoginRequest = { email, password };

    try {
      const response = await postLogin(payload);

      if (response.accessToken) {
        await SecureStore.setItemAsync('accessToken', response.accessToken);
      }
      if (response.refreshToken) {
        await SecureStore.setItemAsync('refreshToken', response.refreshToken);
      }

      return response;
    } catch (err: unknown) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchToken, loading, error };
};

export const useFindEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => await getFindEmail(email),
  });
};

export const useSendCode = () => {
  return useMutation({
    mutationFn: async (email: string) => await postSendCode({ email }),
  });
};

export const useCheckCode = () => {
  return useMutation({
    mutationFn: async ({ email, code }: { email: string; code: string }) =>
      await postCheckCode({ email, code }),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ email, newPassword }: { email: string; newPassword: string }) =>
      await putResetPassword({ email, newPassword }),
  });
};
