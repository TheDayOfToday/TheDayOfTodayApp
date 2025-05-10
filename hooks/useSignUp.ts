import { useRouter } from 'expo-router';
import { postSignUp } from '@/api/my'; // ← index.ts 경로
import type { SignUpRequest } from '@/api/my/entity';
import useShowToast from './useShowToast';

export const useSignUp = () => {
  const router = useRouter();
  const showToast = useShowToast();

  const signUp = async (userData: SignUpRequest) => {
    const { name, email, password, phoneNumber } = userData;

    if (!name || !email || !password || !phoneNumber) {
      showToast('error', '입력 오류', '모든 항목을 입력해주세요.');
      return;
    }

    try {
      const res = await postSignUp(userData);
      showToast('success', '회원가입 완료', res.message || '성공적으로 가입되었습니다.');
      router.replace('/signIn');
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || '서버 오류가 발생했습니다.';
      showToast('error', '회원가입 실패', message);
    }
  };

  return { signUp };
};
