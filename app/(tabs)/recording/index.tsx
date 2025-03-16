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
      <View style={recordingScreenStyles.messageContainer}>
        <Text style={recordingScreenStyles.message}>당신의 하루를 들려주세요</Text>
      </View>
      <SelectModeTab selectMode={handleModeSelect} />
    </GestureHandlerRootView>
  );
};

export default RecordingScreen;
