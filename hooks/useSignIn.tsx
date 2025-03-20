import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useSignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      window.alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://thedayoftoday.kro.kr/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': '*/*' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.replace('/(tabs)');
      } else {
        window.alert('이메일 또는 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      window.alert('서버와의 연결에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const goToSignUp = () => {
    router.push('/signUp');
  };

  return { login, goToSignUp, loading };
};
