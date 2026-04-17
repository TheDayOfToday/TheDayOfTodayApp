import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

import useShowToast from '@/src/hooks/useShowToast';
import { updatePassword } from '@/src/service/auth';

export const usePasswordChange = () => {
  const router = useRouter();
  const showToast = useShowToast();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async () => {
    if (!newPassword.trim()) {
      showToast('error', '입력 필요', '새 비밀번호를 입력해주세요.');
      return;
    }

    if (!confirmPassword.trim()) {
      showToast('error', '입력 필요', '비밀번호 확인란을 입력해주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('error', '비밀번호 불일치', '새 비밀번호가 일치하지 않습니다.');
      return;
    }

    const token = await SecureStore.getItemAsync('accessToken');
    if (!token) {
      showToast('error', '인증 오류', '다시 로그인해주세요.');
      return;
    }

    try {
      await updatePassword(token, { newPassword });
      showToast('success', '비밀번호 변경 완료', '다시 로그인해주세요.');
      router.replace('/signIn');
    } catch {
      showToast('error', '비밀번호 변경 실패', '기존 비밀번호와 같습니다.');
    }
  };

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handlePasswordChange,
  };
};
