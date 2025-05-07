import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectModeTab from '../recording/index';
import { recordingScreenStyles } from '@/styles/recordingScreenStyles';

function RecordingScreen() {
  return (
    <GestureHandlerRootView style={recordingScreenStyles.container}>
      <SelectModeTab/>
    </GestureHandlerRootView>
  );
};

export default RecordingScreen;
