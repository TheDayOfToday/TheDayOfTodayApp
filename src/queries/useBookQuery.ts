import { useQuery, useMutation } from '@tanstack/react-query';
import { getRecommendedBook, postRecommendedBook } from '@/src/service/book';
import useShowToast from '@/src/hooks/useShowToast';
import { QUERY_KEY } from '@/src/interface/key/queryKey';

const useGetBook = (token: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEY.BOOK.RECOMMENDED(),
    queryFn: () => getRecommendedBook(token),
    enabled: !!token,
  });

  return { data, isLoading, error };
};

export default useGetBook;

export const usePostBook = () => {
  const showToast = useShowToast();

  const { mutate } = useMutation({
    mutationFn: async ({ token, diaryId }: { token: string; diaryId: number }) =>
      postRecommendedBook(token, diaryId),
    onError: () => {
      showToast('error', '오늘의 책 추천 실패', '오늘의 책 추천을 하는 데에 실패하였습니다.');
    },
  });

  return { mutate };
};
