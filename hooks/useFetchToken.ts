import { useState } from 'react';

interface TokenResponse {
  accessToken: string;
}

export const useFetchToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = async (email: string, password: string): Promise<TokenResponse> => {
    setLoading(true);
    setError(null);

    try {          
      const response = await fetch('https://thedayoftoday.kro.kr/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      console.log('Authorization:', response.headers.get('Authorization'));
      
      const authHeader = response.headers.get('Authorization');      
      if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new Error('accessToken을 받아오지 못했습니다.');
      }
      const accessToken = authHeader.replace('Bearer', '');
      console.log('Access Token:', accessToken);

      localStorage.setItem('accessToken', accessToken);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || '응답 에러로 로그인 실패');
      } else {
        console.log('서버에 응답 전해짐')
      }          
      return { accessToken };
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchTokens, loading, error };
};
