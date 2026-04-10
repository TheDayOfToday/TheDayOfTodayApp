import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SelectModeTab from '../recording/index';

import useDoubleBackExit from '@/src/hooks/useDoubleBackExit';
import { recordingScreenStyles } from '@/src/styles/recordingScreenStyles';

function RecordingScreen() {
  useDoubleBackExit(true);
  return (
    <GestureHandlerRootView style={recordingScreenStyles.container}>
      <SelectModeTab/>
    </GestureHandlerRootView>
  );
}

export default RecordingScreen;
