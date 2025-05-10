import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectModeTab from '../recording/index';
import AntDesign from '@expo/vector-icons/AntDesign';
import useDoubleBackExit from '@/hooks/useDoubleBackExit';
import { recordingScreenStyles } from '@/styles/recordingScreenStyles';

function RecordingScreen() {
  useDoubleBackExit(true);
  return (
    <GestureHandlerRootView style={recordingScreenStyles.container}>
      <SelectModeTab/>
    </GestureHandlerRootView>
  );
};

export default RecordingScreen;
