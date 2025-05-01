import { useMutation } from '@tanstack/react-query';
import useToken from './useToken';
import { postDiaryAnalysis } from '@/api/record';

interface PostAnalyzeProps {
  token: string;
  diaryId: number;
}

const usePostAnalyze = () => {
  const { mutate, data, isPending} = useMutation({
    mutationFn: async ({
      token,
      diaryId,
    }: PostAnalyzeProps) => postDiaryAnalysis(token, diaryId),
    onError: (error) => {
      console.log('분석 불러오기 실패', error);
    },
  });

  return {
    mutate,
    data,
    isPending,
  };
};

export default usePostAnalyze;