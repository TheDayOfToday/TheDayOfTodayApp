import { useMutation } from '@tanstack/react-query';
import { putUpdateDiary } from '@/api/record';
import { UpdateDiaryRequest } from '@/api/record/entity';
import useShowToast from "./useShowToast";

interface PutUpdateDiaryProps {
  token: string;
  diaryContent: UpdateDiaryRequest;
}

const usePutUpdateDiary = () => {
  const showToast = useShowToast();
  const { mutate } = useMutation({
    mutationFn: async ({
      token,
      diaryContent,
    }: PutUpdateDiaryProps) => putUpdateDiary(token, diaryContent),
    onError: (error) => {
      showToast('error', '분석 불러오기 실패', '분석 불러오는 데에 실패하였습니다.');
    },
  }); 

  return {
    mutate,
  }
}

export default usePutUpdateDiary;
