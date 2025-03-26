import { useRouter } from 'expo-router';
import { useFetchToken } from './useFetchToken';

export const useSignIn = () => {
  const router = useRouter();
  const { fetchTokens, loading, error } = useFetchToken();

  const login = async (email: string, password: string) => {
    try {
      const { accessToken } = await fetchTokens(email, password);
      console.log('로그인 성공! AccessToken:', accessToken);     
      router.replace('/(tabs)');
    } catch (err: any) {
      console.log('로그인 실패:', err.message);
    }
  };

  const goToSignUp = () => {
    router.push('/signUp');
  };

  return { login, goToSignUp, loading, error };
};
