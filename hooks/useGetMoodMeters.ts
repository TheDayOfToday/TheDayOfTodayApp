import { useQuery } from '@tanstack/react-query';
import { getMoodMeters } from '../api/record';
import useToken from './useToken';

const useGetMoodMeters = (diaryId: number | undefined) => {
  const token = useToken();

  const { data, isLoading, error } = useQuery({
    queryKey: ['moodMeters'],
    // 토큰 null 임시 처리
    queryFn: () => getMoodMeters(token!, diaryId!),
    enabled: !!token && !!diaryId,
  });

  console.log('useGetMoodMeters', data);

  return {
    data,
    loading: isLoading,
    error,
  };
};

export default useGetMoodMeters;
