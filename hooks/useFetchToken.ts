import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postLogin } from '@/api/my'; // index.ts 경로
import type { LoginRequest } from '@/api/my/entity';

export const useFetchToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchToken = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const payload: LoginRequest = { email, password };

    try {
      const response = await postLogin(payload);
      console.log('🔐 로그인 응답:', response);

      if (response.accessToken) {
        await AsyncStorage.setItem('accessToken', response.accessToken);
      }
      if (response.refreshToken) {
        await AsyncStorage.setItem('refreshToken', response.refreshToken);
      }

      return response;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchToken, loading, error };
};
