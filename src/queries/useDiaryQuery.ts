import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDiary, putUpdateDiary, deleteDiary, postDiaryAnalysis } from '@/src/service/record';
import { DeleteDiaryRequest, UpdateDiaryRequest } from '@/src/service/record/type';
import useShowToast from '@/src/hooks/useShowToast';
import { QUERY_KEY } from '@/src/interface/key/queryKey';

export const useGetTodayDiary = (token: string, diaryId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEY.DIARY.TODAY(),
    queryFn: () => getDiary(token, diaryId),
    enabled: !!token && !!diaryId,
  });

  return { data, isLoading, error };
};

export const useDeleteDiary = () => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ token, data }: { token: string; data: DeleteDiaryRequest }) =>
      deleteDiary(token, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.CALENDAR.COLORS() });
      queryClient.invalidateQueries({ queryKey: ['diary'] });
    },
    onError: () => {
      showToast('error', '삭제 실패', '일기 삭제에 실패하였습니다.');
    },
  });

  return { mutateAsync };
};

export const usePutUpdateDiary = () => {
  const showToast = useShowToast();

  const { mutate } = useMutation({
    mutationFn: async ({ token, diaryContent }: { token: string; diaryContent: UpdateDiaryRequest }) =>
      putUpdateDiary(token, diaryContent),
    onError: () => {
      showToast('error', '분석 불러오기 실패', '분석 불러오는 데에 실패하였습니다.');
    },
  });

  return { mutate };
};

export const usePostAnalyze = () => {
  const showToast = useShowToast();

  const { mutate, data, isPending } = useMutation({
    mutationFn: async ({ token, diaryId }: { token: string; diaryId: number }) =>
      postDiaryAnalysis(token, diaryId),
    onError: () => {
      showToast('error', '분석 불러오기 실패', '분석 불러오는 데에 실패하였습니다.');
    },
  });

  return { mutate, data, isPending };
};
