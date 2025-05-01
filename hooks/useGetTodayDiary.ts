import { useQuery } from '@tanstack/react-query';
import { getDiary } from '../api/record';
import useToken from './useToken';

const useGetTodayDiary = (token: string, diaryId: number | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todyDiary'],
    queryFn: () => getDiary(token, diaryId!),
    enabled: !!token && !!diaryId,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetTodayDiary;
