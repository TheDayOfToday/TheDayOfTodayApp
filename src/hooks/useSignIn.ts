import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

import useDoubleBackExit from '@/src/hooks/useDoubleBackExit';
import useShowToast from '@/src/hooks/useShowToast';
import { useFetchToken } from '@/src/queries/useAuthQuery';

export const useSignIn = () => {
  const router = useRouter();
  const showToast = useShowToast();
  const { fetchToken, loading } = useFetchToken();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisible = () => setPasswordVisible((prev) => !prev);

  const handleLogin = () => {
    if (!email || !password) {
      showToast('error', '입력 오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      showToast('error', '이메일 오류', '유효한 이메일 형식을 입력해주세요.');
      return;
    }
    login(email, password, autoLogin);
  };

  const login = async (loginEmail: string, loginPassword: string, isAutoLogin: boolean) => {
    try {
      await fetchToken(loginEmail, loginPassword);
      if (isAutoLogin) {
        await SecureStore.setItemAsync('autoLogin', 'true');
      } else {
        await SecureStore.deleteItemAsync('autoLogin');
      }
      router.replace('/(tabs)');
    } catch {
      showToast('error', '로그인 실패', '이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const goToSignUp = () => {
    router.push('/signUp');
  };

  useDoubleBackExit(true);

  return {
    email,
    setEmail,
    password,
    setPassword,
    autoLogin,
    setAutoLogin,
    passwordVisible,
    togglePasswordVisible,
    handleLogin,
    goToSignUp,
    loading,
  };
};
