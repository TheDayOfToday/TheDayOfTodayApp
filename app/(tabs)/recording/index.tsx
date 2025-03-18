import React from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectModeTab from '@/components/SelectModeTab';
import { recordingScreenStyles } from '@/styles/recordingScreenStyles';
import { useRouter } from 'expo-router';

function RecordingScreen() {
  const router = useRouter();

  const handleModeSelect = (mode: string) => {
    if( mode === 'MonologueMode') {
      router.push('/recording/monologue');
    } else if ( mode === 'ConversationMode' ) {
      router.push('/recording/conversation');
    }
  }

  return (
    <GestureHandlerRootView style={recordingScreenStyles.container}>
      <SelectModeTab selectMode={handleModeSelect} />
    </GestureHandlerRootView>
  );
};

export default RecordingScreen;
