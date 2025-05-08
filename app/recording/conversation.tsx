import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Pressable, Modal } from 'react-native';
import useToken from '@/hooks/useToken';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectMoodTab from '@/components/SelectMoodMeterTab';
import useConversationQuestion from '@/hooks/useConversationQuestion';
import useConversationEnd from '@/hooks/useConversationEnd';
import { Audio } from 'expo-av';
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from 'lottie-react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { recordingScreenStyles } from '@/styles/recordingScreenStyles';
import { ModalStyles } from '@/styles/modalStyles';

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
  const {
    mutateAsync: questionMutate,
  } = useConversationQuestion();
  
  const {
    mutateAsync: conversationEndMutate,
    isSuccess,
  } = useConversationEnd();

  const token = useToken();
  const router = useRouter();
  const { diaryId } = useLocalSearchParams();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecorded, setIsRecorded] = useState(false);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [question, setQuestion] = useState('오늘의 하루는 어땠나요?');
  const [questionButtonEnabled, setQuestionButtonEnabled] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

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

  const onPressNextButton = async () => {
    if (!recordedUri) return;
    try {
      const result = await questionMutate({
        token: token!,
        question,
        diaryId: Number(diaryId),
        audioUri: recordedUri,
      });

      if (result?.question) {
        setQuestion(result.question);
        setQuestionButtonEnabled(false);
        setRecordedUri(null);
      }
    } catch (error) {
      console.error('질문 요청 중 오류 발생:', error);
    }
  };

  const onPressRecordButton = async () => {
    if (isRecording) {
      const uri = await stopRecording();
      if (uri) {
        setRecordedUri(uri);
        setQuestionButtonEnabled(true);
        setIsRecorded(true);
      }
    } else {
      setQuestionButtonEnabled(false);
      setRecordedUri(null);
      await startRecording();
    }
  };

  const onPressSubmitButton = async () => {
    if (isRecording) return;

    if (!isRecorded) {
      setShowExitModal(true);
      return;
    }

    const uri = await stopRecording();

    if (!uri) return;

    try {
      await conversationEndMutate({
        token: token!,
        question,
        diaryId: Number(diaryId),
        audioUri: uri,
      });
    } catch (error) {
      console.error('대화 종료 중 오류 발생:', error);
    }
  };

  const onPressCompleteCancelButton = () => {
    router.back();
  }

  return(
    <GestureHandlerRootView>
      <View style={recordingScreenStyles.recordScreen}>
        <View style={recordingScreenStyles.messageContainer}>
          <Text style={recordingScreenStyles.message}>{question}</Text>
        </View>
        <View style={recordingScreenStyles.nextButtonContainer}>
          <Pressable
            style={[
              recordingScreenStyles.nextButton,
              !questionButtonEnabled || isRecording ? { opacity: 0.4 } : {}
            ]}
            onPress={onPressNextButton}
            disabled={!questionButtonEnabled || isRecording}
          >
            <Text style={recordingScreenStyles.nextButtonText}>질문 받기</Text>
          </Pressable>
        </View>
        <SafeAreaView style={recordingScreenStyles.recordingContainer}>
          <LottieView
            source={require('../../assets/RecordingAnimation.json')}
            autoPlay
            loop
            speed={isRecording ? 5 : 0}
            style={recordingScreenStyles.lottie}
          />
        </SafeAreaView>
        <View style={recordingScreenStyles.completeButtonContainer}>
          <Pressable
            style={recordingScreenStyles.playButton}
            onPress={onPressRecordButton}
          >
            {isRecording ? (
              <FontAwesome name="square" size={40} color="#fff" />
            ): (
              <FontAwesome name="circle" size={40} color="#fff" />
            )}
          </Pressable>
          <Pressable
            style={[
              recordingScreenStyles.completeButton,
              isRecording && { opacity: 0.4 }
            ]}
            onPress={onPressSubmitButton}
            disabled={isRecording}
          >
            <MaterialIcons name="call-end" size={30} color="#fff" />
          </Pressable>
        </View>
      </View>
      {showExitModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showExitModal}
          onRequestClose={() => setShowExitModal(false)}
        >
          <View style={ModalStyles.modalOverlay}>
            <View style={ModalStyles.modalContent}>
              <Text style={ModalStyles.modalTitle}>종료하시겠습니까?</Text>
              <Text style={ModalStyles.modalSubtitle}>작성된 내용이 없어 저장되지 않습니다.</Text>
              <View style={ModalStyles.modalButtonContainer}>
                <Pressable
                  style={ModalStyles.finishButton}
                  onPress={() => {
                    onPressCompleteCancelButton();
                    setShowExitModal(false)
                  }
                }>
                  <Text style={ModalStyles.finishButtonText}>확인</Text>
                </Pressable>
                <Pressable
                  style={ModalStyles.cancelButton}
                  onPress={() => setShowExitModal(false)}
                >
                  <Text style={ModalStyles.cancelButtonText}>취소</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {isSuccess && (
        <SelectMoodTab diaryId={Number(diaryId)}/>
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
