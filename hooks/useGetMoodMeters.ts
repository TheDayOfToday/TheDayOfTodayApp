import { useQuery } from '@tanstack/react-query';
import { getMoodMeters } from '../api/record';
import useToken from './useToken';

const useGetMoodMeters = (diaryId: number | undefined) => {
  const token = useToken();
  const { data, isLoading, error } = useQuery({
    queryKey: ['moodMeters'],
    queryFn: () => getMoodMeters(token!, diaryId!),
    enabled: !!token && !!diaryId,
  });

  return {
    data,
    loading: isLoading,
    error,
  };
};

export default useGetMoodMeters;
