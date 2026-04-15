import { useQuery, useMutation } from '@tanstack/react-query';

import useShowToast from '@/src/hooks/useShowToast';
import { bookKeys } from '@/src/interface/key/queryKey';
import { getRecommendedBook, postRecommendedBook } from '@/src/service/book';

const useGetBook = (token: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: bookKeys.recommended(),
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
