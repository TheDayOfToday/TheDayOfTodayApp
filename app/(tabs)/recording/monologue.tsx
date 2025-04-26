import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectMoodTab from '@/components/SelectMoodMeterTab';
import useMonologue from '@/hooks/useMonologue';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';
import { recordingScreenStyles } from '@/styles/recordingScreenStyles';

const recordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: 2, // MPEG_4
    audioEncoder: 3, // AAC
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.caf',
    audioQuality: 2, // HIGH
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 128000,
  },
};

function Monologue() {
  const [isOpen, setIsOpen] = useState(false); // 일기 종료 후 무드미터 바텀 시트
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const { mutate: sendMonologue, data, isSuccess} = useMonologue();

  const startRecording = async () => {
    const permission = await Audio.requestPermissionsAsync();
    if (!permission.granted) return;

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const newRecording = new Audio.Recording();
    await newRecording.prepareToRecordAsync(recordingOptions);
    await newRecording.startAsync();
    setRecording(newRecording);
  };

  const stopRecording = async (): Promise<string | null> => {
    if (!recording) return null;
    const status = await recording.getStatusAsync();
    if (!status.isRecording && status.isDoneRecording) {
      return recording.getURI();
  }

  await recording.stopAndUnloadAsync();
    return recording.getURI();
  };

  const onPressSubmitButton = async () => {
    setIsOpen(true);
    const uri = await stopRecording();
    if (uri) {
      sendMonologue(uri);
    }
  };

  // useEffect(() => {
  //   startRecording();
  //   return () => {
  //     stopRecording();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isSuccess && data?.diaryId) {
  //     setIsOpen(true);
  //   }
  // }, [isSuccess, data]);

  return(
    <GestureHandlerRootView>
      <View style={recordingScreenStyles.recordScreen}>
        <View style={recordingScreenStyles.messageContainer}>
          <Text style={recordingScreenStyles.message}>당신의 하루를 들려주세요</Text>
        </View>
        <SafeAreaView style={recordingScreenStyles.recordingContainer}>
          <LottieView
            source={require('../../../assets/RecordingAnimation.json')}
            autoPlay
            loop
            speed={3}
            style={recordingScreenStyles.lottie}
          />
        </SafeAreaView>
        <View style={recordingScreenStyles.submitButtonContainer}>
          <Pressable
            style={recordingScreenStyles.submitButton}
            onPress={onPressSubmitButton}
          >
            <Text style={recordingScreenStyles.submitButtonText}>마침</Text>
          </Pressable>
        </View>
      </View>
      {isOpen && (
        <SelectMoodTab diaryId={1234}/>
      )}
    </GestureHandlerRootView>
  );
};

export default Monologue;
