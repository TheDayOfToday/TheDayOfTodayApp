import React, { useCallback, useState } from 'react';
import { ScrollView, View, Text, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import useShowToast from '@/hooks/useShowToast';
import { recordingResultStyles } from "@/styles/recordingResultStyles";

function ResultScreen() {
  const router = useRouter();
  const [text, onChangeText] = useState('');
  const showToast = useShowToast();

  const handleNextButtonPress = useCallback(() => {
    router.push('/recording/daily-analysis');
  }, []);

  const handleSaveButtonPress = useCallback(() => {
    showToast('success', '저장 완료', '오늘의 일기가 저장되었습니다.');
  }, []);

  return (
    <ScrollView
      style={recordingResultStyles.Screen}
      contentContainerStyle={recordingResultStyles.container}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View style={recordingResultStyles.nextButtonContainer}>
        <Pressable style={recordingResultStyles.nextButton} onPress={handleNextButtonPress}>
          <Text style={recordingResultStyles.nextButtonText}>일기 분석 보러가기 {">>"}</Text>
        </Pressable>
      </View>
      <Text style={recordingResultStyles.title}>오늘의 일기</Text>
      <View style={recordingResultStyles.resultContainer}>
        <TextInput
            style={recordingResultStyles.resultText}
            placeholder='오늘의 일기를 작성해보세요'
            onChangeText={onChangeText}
            value={text}
            multiline={true}
          />
      </View>
      <View style={recordingResultStyles.saveButtonContainer}>
        <Pressable style={recordingResultStyles.saveButton} onPress={handleSaveButtonPress}>
          <Text style={recordingResultStyles.saveButtonText}>저장</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default ResultScreen;
