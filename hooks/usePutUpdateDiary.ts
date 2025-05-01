import { useMutation } from '@tanstack/react-query';
import { putUpdateDiary } from '@/api/record';
import { UpdateDiaryRequest } from '@/api/record/entity';
import useShowToast from "./useShowToast";

interface PutUpdateDiaryProps {
  token: string;
  diaryContent: UpdateDiaryRequest;
}

const usePutUpdateDiary = () => {
  const { mutate } = useMutation({
    mutationFn: async ({
      token,
      diaryContent,
    }: PutUpdateDiaryProps) => putUpdateDiary(token, diaryContent),
    onError: (error) => {
      console.log('일기 불러오기 실패', error);
    },
  }); 

  return {
    mutate,
  }
}

export default usePutUpdateDiary;
