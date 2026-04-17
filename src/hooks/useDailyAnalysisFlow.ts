import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect } from 'react';

import { useToken } from '@/src/hooks/useToken';
import { usePostBook } from '@/src/queries/useBookQuery';
import { usePostAnalyze } from '@/src/queries/useDiaryQuery';

export const useDailyAnalysisFlow = () => {
  const token = useToken();
  const router = useRouter();
  const { diaryId } = useLocalSearchParams();
  const numericDiaryId = Number(diaryId);
  const { mutate: analysisMutate, data, isPending } = usePostAnalyze();
  const { mutate: bookMutate } = usePostBook();

  const handleSubmitPress = useCallback(() => {
    router.push('/(tabs)/record');
  }, [router]);

  useEffect(() => {
    if (token && !isNaN(numericDiaryId)) {
      analysisMutate(
        { token, diaryId: numericDiaryId },
        {
          onSuccess: () => {
            bookMutate({ token, diaryId: numericDiaryId });
          },
        },
      );
    }
  }, [token, numericDiaryId, analysisMutate, bookMutate]);

  return {
    isPending,
    analysis: data?.analysis,
    handleSubmitPress,
  };
};
