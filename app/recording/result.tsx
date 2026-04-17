import React from 'react';
import { ScrollView, View, Text, Pressable, TextInput } from 'react-native';

import { useDiaryEditor } from '@/src/hooks/useDiaryEditor';
import { recordingResultStyles } from '@/src/styles/recordingResultStyles';

function ResultScreen() {
  const {
    title,
    content,
    isFocused,
    onChangeTitle,
    onChangeContent,
    handleTitleFocus,
    handleTitleBlur,
    handleNextButtonPress,
    handleSaveButtonPress,
  } = useDiaryEditor();

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
            isFocused
              ? recordingResultStyles.titleBorderFocused
              : recordingResultStyles.titleBorderUnfocused,
          ]}
          onFocus={handleTitleFocus}
          onBlur={handleTitleBlur}
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
