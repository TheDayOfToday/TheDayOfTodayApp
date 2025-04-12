import { useQuery } from '@tanstack/react-query';
import { postStartConversation } from '../api/record';
// import token from './useToken';

const useMoodMeters = () => {
  // const token  = useToken();
  const { data, isLoading, error } = useQuery({
    queryKey: ['moodMeters'],
    // queryFn: () => postStartConversation(token), // 토큰 넘겨주기
  });

  return {
    data: data ?? [],
    loading: isLoading,
    error,
  };
};

export default useMoodMeters;
