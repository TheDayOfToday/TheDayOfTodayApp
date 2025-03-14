import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { recordScreenStyles } from '@/styles/recordScreenStyles';

interface ConversationProps {
  setMode: (mode: string) => void;
}

function Conversation({setMode}: ConversationProps) {
  const onPressSubmitButton = () => {
    setMode('');
  }

  return(
    <View style={recordScreenStyles.recordScreen}>
      <Text style={recordScreenStyles.message}>당신의 하루를 들려주세요</Text>
      <Text>{'대화'}</Text>
      <Pressable
        style={recordScreenStyles.submitButton}
        onPress={onPressSubmitButton}
      >
        <Text style={recordScreenStyles.submitButtonText}>마침</Text>
      </Pressable>
    </View>
  );
};

export default Conversation;
