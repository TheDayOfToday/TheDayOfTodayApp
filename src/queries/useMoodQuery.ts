import { useQuery, useMutation } from '@tanstack/react-query';
import { getMoodMeters, postMoodMeters } from '@/src/service/record';
import { UpdateMoodRequest } from '@/src/service/record/type';
import useToken from '@/src/hooks/useToken';
import useShowToast from '@/src/hooks/useShowToast';
import { QUERY_KEY } from '@/src/interface/key/queryKey';

export const useGetMoodMeters = (diaryId: number | undefined) => {
  const token = useToken();

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEY.DIARY.MOOD_METERS(diaryId!),
    queryFn: () => getMoodMeters(token!, diaryId!),
    enabled: !!token && !!diaryId,
  });

  return { data, loading: isLoading, error };
};

interface PostMoodMetersProps {
  token: string;
  diaryId: number;
  moodMeter: UpdateMoodRequest;
}

export const usePostMoodMeters = () => {
  const showToast = useShowToast();

  const { mutate, error } = useMutation({
    mutationFn: async ({ token, diaryId, moodMeter }: PostMoodMetersProps) =>
      postMoodMeters(token, diaryId, moodMeter),
    onError: () => {
      showToast('error', '업로드 실패', '무드미터를 저장하지 못하였습니다.');
    },
  });

  return { mutate, error };
};
