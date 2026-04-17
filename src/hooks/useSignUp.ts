import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import useShowToast from './useShowToast';

import type { AxiosError } from 'axios';

import { postSignUp } from '@/src/service/auth';

interface SignUpProps {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface ErrorResponseData {
  message?: string;
}

export const useSignUp = () => {
  const router = useRouter();
  const showToast = useShowToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ name, email, password, phoneNumber }: SignUpProps) =>
      postSignUp({ name, email, password, phoneNumber }),
    onSuccess: () => {
      router.back();
      showToast('success', '회원가입 완료', '성공적으로 가입되었습니다.');
    },
    onError: (error: AxiosError<ErrorResponseData>) => {
      const message = error?.response?.data?.message || error?.message || '서버 오류가 발생했습니다.';
      showToast('error', '회원가입 실패', message);
    },
  });

  return { mutate, isPending };
};
