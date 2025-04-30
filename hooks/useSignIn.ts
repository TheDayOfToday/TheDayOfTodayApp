import { useRouter } from 'expo-router';
import { useFetchToken } from './useFetchToken';
import useShowToast from './useShowToast';

export const useSignIn = () => {
  const router = useRouter();
  const showToast = useShowToast();
  const { fetchTokens, loading, error } = useFetchToken();

  const login = async (email: string, password: string) => {
    try {
      const { accessToken } = await fetchTokens(email, password);
      console.log('로그인 성공! AccessToken:', accessToken);
      showToast('success', '로그인 성공', '로그인에 성공했습니다.');
      router.replace('/(tabs)');
    } catch (err: any) {
      console.log('로그인 실패:', err.message);
      showToast('error', '로그인 실패', '이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const goToSignUp = () => {
    router.push('/signUp');
  };

  return { login, goToSignUp, loading, error };
};
