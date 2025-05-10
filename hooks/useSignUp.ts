import { postSignUp } from '@/api/my';
import useShowToast from './useShowToast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

interface useSignUpProps {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export const useSignUp = () => {
  const router = useRouter();
  const showToast = useShowToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
      phoneNumber,
    }: useSignUpProps) => postSignUp({name, email, password, phoneNumber}),
    onSuccess: () => {
      router.back();
      showToast('success', '회원가입 완료', '성공적으로 가입되었습니다.');
    },
    onError: (error : any) => {
      const message = error?.response?.data?.message || error?.message || '서버 오류가 발생했습니다.';
      showToast('error', '회원가입 실패', message);
    }
  });

  return {
    mutate,
    isPending,
  }
}
