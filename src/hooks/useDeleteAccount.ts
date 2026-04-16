import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

import useShowToast from '@/src/hooks/useShowToast';
import { deleteUser } from '@/src/service/auth';

export const useDeleteAccount = () => {
  const router = useRouter();
  const showToast = useShowToast();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleDeleteAccount = async () => {
    const token = await SecureStore.getItemAsync('accessToken');
    if (!token) {
      router.replace('/signIn');
      showToast('error', '계정 삭제 실패', '로그인이 필요합니다.');
      return;
    }

    try {
      await deleteUser(token);
      showToast('success', '회원 탈퇴 완료', '그동안 이용해주셔서 감사합니다.');
      await SecureStore.deleteItemAsync('accessToken');
      router.replace('/signIn');
    } catch {
      showToast('error', '회원 탈퇴 실패', '다시 시도해주세요.');
    }
  };

  const handleDeleteAndClose = () => {
    handleDeleteAccount();
    setModalIsOpen(false);
  };

  return {
    modalIsOpen,
    openModal,
    closeModal,
    handleDeleteAndClose,
  };
};
