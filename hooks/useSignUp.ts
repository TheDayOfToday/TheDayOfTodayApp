import { postSignUp } from '@/api/my'; // index.ts 경로
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
    onError: () => {
      showToast('error', '회원가입 실패', '입력을 다시 확인하여 주세요.');
    }
  });

  return {
    mutate,
    isPending,
  }
}
