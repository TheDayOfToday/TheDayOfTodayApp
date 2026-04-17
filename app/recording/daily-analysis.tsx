import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';

import { useDailyAnalysisFlow } from '@/src/hooks/useDailyAnalysisFlow';
import { dailyAnalysisScreenStyles } from '@/src/styles/dailyAnalysisScreenStyles';

function DailyAnalysisScreen() {
  const { isPending, analysis, handleSubmitPress } = useDailyAnalysisFlow();

  return (
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
          {isPending ? 'Loading...' : analysis}
        </Text>
      </View>
    </ScrollView>
  );
}

export default DailyAnalysisScreen;
