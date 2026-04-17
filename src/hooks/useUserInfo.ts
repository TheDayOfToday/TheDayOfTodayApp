import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

import type { UserInfoResponse } from '@/src/service/auth/type';

import useShowToast from '@/src/hooks/useShowToast';
import { getUserInfo } from '@/src/service/auth';

const formatPhoneNumber = (number: string) => {
  if (!number) return '';
  return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};

export const useUserInfo = () => {
  const router = useRouter();
  const showToast = useShowToast();

  const [user, setUser] = useState({
    name: '',
    email: '',
    profileImage: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      if (!token) {
        router.replace('/signIn');
        showToast('error', '로그인 필요', '로그인이 필요합니다.');
        return;
      }

      try {
        const data: UserInfoResponse = await getUserInfo(token);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(data);
      } catch {
        showToast('error', '오류', '유저 정보를 가져오지 못했습니다.');
      }
    };

    fetchUserInfo();
  }, [router, showToast]);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('autoLogin');
    showToast('success', '로그아웃 되었습니다.', '다음에 또 만나요 👋');
    router.replace('/signIn');
  };

  const navigateToEditPassword = () => {
    router.push('/edit-password');
  };

  return {
    user,
    formattedPhoneNumber: formatPhoneNumber(user.phoneNumber),
    handleLogout,
    navigateToEditPassword,
  };
};
