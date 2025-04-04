import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectMoodTab from '@/components/SelectMoodMeterTab';
import { recordingScreenStyles } from '@/styles/recordingScreenStyles';

function Monologue() {
  const [isOpen, setIsOpen] = useState(false);

  const onPressSubmitButton = () => {
    setIsOpen(true);
  }

  return(
    <GestureHandlerRootView>
      <View style={recordingScreenStyles.recordScreen}>
        <View style={recordingScreenStyles.messageContainer}>
          <Text style={recordingScreenStyles.message}>당신의 하루를 들려주세요</Text>
        </View>
        <View style={recordingScreenStyles.recordingContainer}>
          <Text style={recordingScreenStyles.recordingText}>recording...</Text>
        </View>
        <View style={recordingScreenStyles.submitButtonContainer}>
          <Pressable
            style={recordingScreenStyles.submitButton}
            onPress={onPressSubmitButton}
          >
            <Text style={recordingScreenStyles.submitButtonText}>마침</Text>
          </Pressable>
        </View>
      </View>
      {isOpen && <SelectMoodTab />}
    </GestureHandlerRootView>
  );
};

export default Monologue;
