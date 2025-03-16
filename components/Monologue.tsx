import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectMoodTab from './SelectMoodTab';
import { recordScreenStyles } from '@/styles/recordScreenStyles';

function Monologue() {
  const [isOpen, setIsOpen] = useState(false);

  const onPressSubmitButton = () => {
    setIsOpen(true);
  }

  return(
    <GestureHandlerRootView>
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
      {isOpen && <SelectMoodTab />}
    </GestureHandlerRootView>
  );
};

export default Monologue;
