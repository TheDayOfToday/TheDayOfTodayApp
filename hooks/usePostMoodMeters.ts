import { useMutation } from '@tanstack/react-query';
import useShowToast from '@/hooks/useShowToast';
import useToken from './useToken';
import { postMoodMeters } from '@/api/record';
import { UpdateMoodRequest } from '@/api/record/entity';

interface PostMoodMetersProps {
  diaryId: number | undefined;
  moodMeter: UpdateMoodRequest;
}

const usePostMoodMeters = () => {
  const token  = useToken();
  const showToast = useShowToast();

  const { mutate, error} = useMutation({
    mutationFn: async (
      {
        diaryId,
        moodMeter
      }: PostMoodMetersProps) => postMoodMeters(token!, diaryId!, moodMeter ),
    onSuccess: () => {
      console.log(mutate);
      showToast('success', '업로드 성공', '무드미터를 저장하였습니다.');
    },
    onError: (error) => {
      console.error('무드미터 전송 실패:', error);
      showToast('error', '업로드 실패', '무드미터를 저장하지 못하였습니다.');
    },
  });

  return {
    mutate,
    error,
  };
};

export default usePostMoodMeters;