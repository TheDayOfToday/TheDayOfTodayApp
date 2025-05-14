import { useMutation } from '@tanstack/react-query';
import useShowToast from './useShowToast';
import { postRecommendedBook } from '@/api/book';

interface usePostBookProps {
  token: string;
  diaryId: number;
}

const usePostBook = () => {
  const showToast = useShowToast();
  const { mutate } = useMutation({
    mutationFn: async ({
      token,
      diaryId,
    }: usePostBookProps) => postRecommendedBook(token, diaryId),
    onError: () => {
      showToast('error', '오늘의 책 추천 실패', '오늘의 책 추천을 하는 데에 실패하였습니다.');
    },
  });

  return {
    mutate,
  };
};

export default usePostBook;
