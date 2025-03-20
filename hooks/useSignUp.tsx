import { useRouter } from 'expo-router';

export const useSignUp = () => {
  const router = useRouter();

  const signUp = async (userData: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => {
    const { name, email, password, phoneNumber } = userData;

    if (!name || !email || !password || !phoneNumber) {
      window.alert('모든 항목을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('https://thedayoftoday.kro.kr/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': '*/*' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        window.alert('회원가입이 완료되었습니다!');
        router.replace('/signIn');
      } else {
        window.alert('회원가입 실패. 다시 시도해주세요.');
      }
    } catch (error) {
      window.alert('서버 연결 실패');
    }
  };

  return { signUp };
};