import { useMutation } from '@tanstack/react-query';
import useShowToast from '@/hooks/useShowToast';
import useToken from './useToken';
import { postMoodMeters } from '@/api/record';
import { UpdateMoodRequest } from '@/api/record/entity';

interface PostMoodMetersProps {
  token: string | null;
  diaryId: number;
  moodMeter: UpdateMoodRequest;
}

const usePostMoodMeters = () => {
  const showToast = useShowToast();

  const { mutate, error } = useMutation({
    // 토큰 null 임시 처리
    mutationFn: async (
      {
        token,
        diaryId,
        moodMeter
      }: PostMoodMetersProps) => postMoodMeters(token!, diaryId, moodMeter ),
    onError: (error) => {
      showToast('error', '업로드 실패', '무드미터를 저장하지 못하였습니다.');
    },
  });

  return {
    mutate,
    error,
  };
};

export default usePostMoodMeters;
