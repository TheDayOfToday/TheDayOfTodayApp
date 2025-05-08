import { useMutation } from '@tanstack/react-query';
import useToken from './useToken';
import { postDiaryAnalysis } from '@/api/record';
import useShowToast from './useShowToast';

interface PostAnalyzeProps {
  token: string;
  diaryId: number;
}

const usePostAnalyze = () => {
  const showToast = useShowToast();
  const { mutate, data, isPending} = useMutation({
    mutationFn: async ({
      token,
      diaryId,
    }: PostAnalyzeProps) => postDiaryAnalysis(token, diaryId),
    onError: () => {
      showToast('error', '분석 불러오기 실패', '분석 불러오는 데에 실패하였습니다.');
    },
  });

  return {
    mutate,
    data,
    isPending,
  };
};

export default usePostAnalyze;