import { useRouter } from 'expo-router';
import useShowToast from './useShowToast';

export const useSignUp = () => {
  const router = useRouter();

  const signUp = async (userData: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => {
    const { name, email, password, phoneNumber } = userData;
    const showToast = useShowToast();

    if (!name || !email || !password || !phoneNumber) {
      window.alert('모든 항목을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('https://thedayoftoday.kro.kr/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': '*/*' },
        body: JSON.stringify(userData),
        credentials: 'include'
      });

      if (response.ok) {
        showToast('success', '회원가입 성공', '회원가입이 완료되었습니다.');
        router.replace('/signIn');
      } else {
        showToast('error', '회원가입 실패', '회원가입을 다시 시도해주세요.');
      }
    } catch (error) {
      showToast('error', '회원가입 실패', '서버 연결에 실패하였습니다.');
    }
  };

  return { signUp };
};