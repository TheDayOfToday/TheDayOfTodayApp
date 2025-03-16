import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectMoodTab from '@/components/SelectMoodTab';
import { recordingScreenStyles } from '@/styles/recordingScreenStyles';

function Monologue() {
  const [isOpen, setIsOpen] = useState(false);

  const onPressSubmitButton = () => {
    setIsOpen(true);
  }

  return(
    <GestureHandlerRootView>
      <View style={recordingScreenStyles.recordScreen}>
        <Text>{'독백'}</Text>
        <Pressable
          style={recordingScreenStyles.submitButton}
          onPress={onPressSubmitButton}
        >
          <Text style={recordingScreenStyles.submitButtonText}>마침</Text>
        </Pressable>
      </View>
      {isOpen && <SelectMoodTab />}
    </GestureHandlerRootView>
  );
};

export default Monologue;
