import React, { useCallback } from 'react';
import { recordingResultStyles } from "@/styles/recordingResultStyles";
import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

function ResultScreen() {
  const router = useRouter();

  const handleSubmitPress = useCallback(() => {
    router.push('/recording/daily-analysis');
  }, []);

  return (
    <View style={recordingResultStyles.container}>
      <Text style={recordingResultStyles.text}>일기 결과 화면</Text>
      <Pressable onPress={handleSubmitPress}>
        <Text>일기 분석 보러가기</Text>
      </Pressable>
    </View>
  );
}

export default ResultScreen;
