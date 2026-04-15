import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';

import { useToken } from '@/src/hooks/useToken';
import { usePostBook } from '@/src/queries/useBookQuery';
import { usePostAnalyze } from '@/src/queries/useDiaryQuery';
import { dailyAnalysisScreenStyles } from '@/src/styles/dailyAnalysisScreenStyles';

function DailyAnalysisScreen() {
  const token = useToken();
  const router = useRouter();
  const { diaryId } = useLocalSearchParams();
  const numericDiaryId = Number(diaryId);
  const { mutate: analysisMutate, data, isPending} = usePostAnalyze();
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
          }
        }
      );
    }
  }, [token, numericDiaryId, analysisMutate, bookMutate]);

  return(
    <ScrollView
      style={dailyAnalysisScreenStyles.Screen}
      contentContainerStyle={dailyAnalysisScreenStyles.container}
    >
      <View style={dailyAnalysisScreenStyles.finishButtonContainer}>
        <Pressable style={dailyAnalysisScreenStyles.finishButton} onPress={handleSubmitPress}>
          <Text style={dailyAnalysisScreenStyles.finishButtonText}>마치기 {'>>'}</Text>
        </Pressable>
      </View>
      <Text style={dailyAnalysisScreenStyles.title}>오늘의 일기 분석</Text>
      <View style={dailyAnalysisScreenStyles.resultContainer}>
        <Text style={dailyAnalysisScreenStyles.resultText}>
          {isPending ? 'Loading...' : data?.analysis}
        </Text>
      </View>
    </ScrollView>
  );
}

export default DailyAnalysisScreen;
