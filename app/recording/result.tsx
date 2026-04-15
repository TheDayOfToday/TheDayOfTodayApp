import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { ScrollView, View, Text, Pressable, TextInput } from 'react-native';

import useDoubleBackExit from '@/src/hooks/useDoubleBackExit';
import useShowToast from '@/src/hooks/useShowToast';
import { useToken } from '@/src/hooks/useToken';
import { useGetTodayDiary, usePutUpdateDiary } from '@/src/queries/useDiaryQuery';
import { recordingResultStyles } from '@/src/styles/recordingResultStyles';

function ResultScreen() {
  const token = useToken();
  const router = useRouter();
  const { diaryId } = useLocalSearchParams();
  const numericDiaryId = useMemo(() => Number(diaryId), [diaryId]);
  const [isFocused, setIsFocused] = useState(false);
  const [title, onChangeTitle] = useState('');
  const [content, onChangeContent] = useState('');
  const showToast = useShowToast();

  const { data: diaryData, isLoading } = useGetTodayDiary(token!, numericDiaryId);
  const { mutate: updateDiaryMutate } = usePutUpdateDiary();

  const handleNextButtonPress = useCallback(() => {
    router.push({
      pathname: '/recording/daily-analysis',
      params: { diaryId: diaryId.toString() },
    });
  }, [router, diaryId]);

  const handleSaveButtonPress = async () => {
    if (!content) {
      showToast('error', '저장 실패', '일기를 작성해주세요.');
      return;
    }

    try {
      await updateDiaryMutate({
        token: token!,
        diaryContent: {
          diaryId: numericDiaryId,
          title,
          content,
        },
      });
      showToast('success', '저장 완료', '오늘의 일기가 저장되었습니다.');
    } catch {
      showToast('error', '업로드 실패', '일기를 저장하는 데에 실패했습니다.');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (diaryData?.title) onChangeTitle(diaryData.title);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (diaryData?.content) onChangeContent(diaryData.content);
  }, [diaryData]);

  useEffect(() => {
    if (isLoading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      onChangeContent('로딩 중...');
    }
  }, [isLoading]);

  useDoubleBackExit(true);

  return (
    <ScrollView
      style={recordingResultStyles.Screen}
      contentContainerStyle={recordingResultStyles.container}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View style={recordingResultStyles.nextButtonContainer}>
        <Pressable style={recordingResultStyles.nextButton} onPress={handleNextButtonPress}>
          <Text style={recordingResultStyles.nextButtonText}>일기 분석 보러가기 {'>>'}</Text>
        </Pressable>
      </View>
      <View style={recordingResultStyles.titleInputContainer}>
        <TextInput
          style={[
            recordingResultStyles.title,
            {
              borderBottomColor: isFocused ? '#132a9e' : '#ccc',
              borderBottomWidth: 1,
            },
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeTitle}
          value={title}
          underlineColorAndroid="transparent"
          selectionColor="#132a9e"
        />
      </View>
      <View style={recordingResultStyles.resultContainer}>
        <TextInput
            style={recordingResultStyles.resultText}
            placeholder='오늘의 일기를 작성해보세요'
            onChangeText={onChangeContent}
            value={content}
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
