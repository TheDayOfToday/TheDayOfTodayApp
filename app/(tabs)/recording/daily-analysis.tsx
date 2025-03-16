import React, { useCallback } from 'react';
import { View, Text, Pressable } from "react-native";
import { dailyAnalysisScreenStyles } from "@/styles/dailyAnalysisScreenStyles";
import { useRouter } from "expo-router";


function DailyAnalysisScreen() {
  const router = useRouter();

  const handleSubmitPress = useCallback(() => {
    router.push('/(tabs)/recording');
  }, []);

  return(
    <View style={dailyAnalysisScreenStyles.container}>
      <Text style={dailyAnalysisScreenStyles.text}>일기 분석 화면</Text>
      <Pressable onPress={handleSubmitPress}>
        <Text>마치기</Text>
      </Pressable>
    </View>
  );
};

export default DailyAnalysisScreen;
