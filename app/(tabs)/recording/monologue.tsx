import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectMoodTab from '@/components/SelectMoodMeterTab';
import usePostMonologue from '@/hooks/usePostMonologue';
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
    extension: '.m4a',
    audioQuality: 2, // HIGH
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 128000,
  },
};

function Monologue() {
  const [isOpen, setIsOpen] = useState(false); // 일기 종료 후 무드미터 바텀 시트
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const { mutate: sendMonologue, data, isSuccess} = usePostMonologue();

  const startRecording = async () => {
    try {
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
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async (): Promise<string | null> => {
    if (!recording) return null;
  
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);
      return uri;
    } catch (error) {
      console.error('Failed to stop recording', error);
      return null;
    }
  };

  const onPressSubmitButton = async () => {
    if (!isRecording) {
      console.warn('녹음 중이 아닙니다.');
      return;
    }
    const uri = await stopRecording();
    if (!uri) return;

    sendMonologue(uri);
    // setIsOpen(true);
  };

  useEffect(() => {
    const start = async () => {
      await startRecording();
    };
    start();
    return () => {
      stopRecording();
    }
  }, []);

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
      {isSuccess && data && (
        <SelectMoodTab diaryId={data.diaryId}/>
      )}
    </GestureHandlerRootView>
  );
};

export default Monologue;
