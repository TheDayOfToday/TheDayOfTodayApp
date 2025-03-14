import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { recordScreenStyles } from '@/styles/recordScreenStyles';

type MonologueProp = {
  setMode: (mode: string) => void;
};

function Monologue({setMode}: MonologueProp) {
  const onPressSubmitButton = () => {
    setMode('');
  }

  return(
    <View style={recordScreenStyles.recordScreen}>
      <Text style={recordScreenStyles.message}>당신의 하루를 들려주세요</Text>
      <Text>{'독백'}</Text>
      <Pressable
        style={recordScreenStyles.submitButton}
        onPress={onPressSubmitButton}
      >
        <Text style={recordScreenStyles.submitButtonText}>마침</Text>
      </Pressable>
    </View>
  );
};

export default Monologue;
