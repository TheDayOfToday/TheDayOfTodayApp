import React, { useCallback } from 'react';
import { ScrollView, View, Text, Pressable } from "react-native";
import { dailyAnalysisScreenStyles } from "@/styles/dailyAnalysisScreenStyles";
import { useRouter } from "expo-router";


function DailyAnalysisScreen() {
  const router = useRouter();

  const handleSubmitPress = useCallback(() => {
    router.push('/(tabs)/recording');
  }, []);

  return(
    <ScrollView
      style={dailyAnalysisScreenStyles.Screen}
      contentContainerStyle={dailyAnalysisScreenStyles.container}
    >
      <View style={dailyAnalysisScreenStyles.finishButtonContainer}>
        <Pressable style={dailyAnalysisScreenStyles.finishButton} onPress={handleSubmitPress}>
          <Text style={dailyAnalysisScreenStyles.finishButtonText}>마치기 {">>"}</Text>
        </Pressable>
      </View>
      <Text style={dailyAnalysisScreenStyles.title}>오늘의 일기 분석</Text>
      <View style={dailyAnalysisScreenStyles.resultContainer}>
        <Text style={dailyAnalysisScreenStyles.resultText}>오늘의 일기 분석</Text>
      </View>
    </ScrollView>
  );
};

export default DailyAnalysisScreen;
