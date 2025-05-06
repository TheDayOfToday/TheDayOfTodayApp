import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectMoodTab from '@/components/SelectMoodMeterTab';
import useConversationQuestion from '@/hooks/useConversationQuestion';
import useConversationEnd from '@/hooks/useConversationEnd';
import { Audio } from 'expo-av';
import { useLocalSearchParams } from "expo-router";
import LottieView from 'lottie-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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

function Conversation() {
  const { diaryId } = useLocalSearchParams();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [question, setQuestion] = useState('오늘의 하루는 어땠나요?');

  const { mutate: questionMutate, data, isSuccess } = useConversationQuestion();
  // const { mutate: conversationEndMutate, data, isSuccess } = useConversationEnd();

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
        return null;
      }
    };

  const onPressNextButton = () => {

  }

  const onPressSubmitButton = async() => {
    // if (!isRecording) {
    //   console.warn('녹음 중이 아닙니다.');
    //   return;
    // }
    // const uri = await stopRecording();
    // if (!uri) return;

    // sendMonologue(uri);
  }

  // useEffect(() => {
  //     const start = async () => {
  //       await startRecording();
  //     };
  //     start();
  //     return () => {
  //       stopRecording();
  //     }
  //   }, []);

  return(
    <GestureHandlerRootView>
      <View style={recordingScreenStyles.recordScreen}>
        <View style={recordingScreenStyles.messageContainer}>
          <Text style={recordingScreenStyles.message}>{question}</Text>
        </View>
        <View style={recordingScreenStyles.nextButtonContainer}>
          <Pressable
            style={recordingScreenStyles.nextButton}
            onPress={onPressNextButton}
          >
            <Text style={recordingScreenStyles.nextButtonText}>다음</Text>
          </Pressable>
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
            style={recordingScreenStyles.completeButton}
            onPress={onPressSubmitButton}
          >
            <MaterialIcons name="call-end" size={30} color="#fff" />
          </Pressable>
        </View>
      </View>
      {false && (
        <SelectMoodTab diaryId={1}/>
      )}
      {/*
      {isSuccess && data && (
        <SelectMoodTab diaryId={data.diaryId}/>
      )}
      */}
    </GestureHandlerRootView>
  );
};

export default Conversation;
