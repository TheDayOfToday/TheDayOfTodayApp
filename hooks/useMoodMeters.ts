import { useQuery } from '@tanstack/react-query';
import { getMoodMeters } from '../api/record';
import useToken from './useToken';

const useMoodMeters = (diaryId: number) => {
  const token = useToken();

  const { data, isLoading, error } = useQuery({
    queryKey: ['moodMeters'],
    // 토큰 null 임시 처리
    queryFn: () => getMoodMeters(token!, diaryId),
    enabled: !!token,
  });

  return {
    diaryMood: data?.diaryMood,
    moodCategories: data?.moodCategories ?? [],
    loading: isLoading,
    error,
  };
};

export default useMoodMeters;
