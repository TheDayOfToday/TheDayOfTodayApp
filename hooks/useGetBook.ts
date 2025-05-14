import { useQuery } from '@tanstack/react-query';
import { getRecommendedBook } from '@/api/book';

const useGetBook = (token: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todyDiary'],
    queryFn: () => getRecommendedBook(token),
    enabled: !!token
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetBook;
