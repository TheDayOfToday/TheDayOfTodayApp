import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Audio } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Pressable, Modal, BackHandler } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import LoadingScreen from '@/src/components/common/Loading';
import SelectMoodTab from '@/src/components/common/SelectMoodMeterTab';
import useShowToast from '@/src/hooks/useShowToast';
import useToken from '@/src/hooks/useToken';
import { useConversationQuestion, useConversationEnd } from '@/src/queries/useRecordQuery';
import { ModalStyles } from '@/src/styles/modalStyles';
import { recordingScreenStyles } from '@/src/styles/recordingScreenStyles';

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
    isPending: isNextPending,
  } = useConversationQuestion();

  const {
    mutateAsync: conversationEndMutate,
    isSuccess,
    isPending: isEndPending,
  } = useConversationEnd();

  const token = useToken();
  const showToast = useShowToast();
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
      } catch {
        stopRecording();
        showToast('error', '녹음 시도 실패', '녹음을 다시 시도해주세요.');
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
      } catch {
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
    } catch {
      showToast('error', '질문 요청 실패', '질문 요청을 다시 시도해주세요.');
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

    try {
      await conversationEndMutate({
        token: token!,
        question,
        diaryId: Number(diaryId),
        audioUri: recordedUri ?? undefined,
      });
    } catch {
      showToast('error', '대화 종료 실패', '대화를 다시 시도해주세요.');
      router.push('/record');
    }
  };

  const handelExit = async () => {
    if (isRecording) {
      await stopRecording();
    }
    router.back();
    setShowExitModal(false);
  };

  useEffect(() => {
    const backAction = () => {
      setShowExitModal(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return(
    <GestureHandlerRootView>
      {isEndPending ? (
        <LoadingScreen />
      ) : (
        <View style={recordingScreenStyles.recordScreen}>
          {isNextPending ? (
            <SafeAreaView style={recordingScreenStyles.loadingLottieContainer}>
              <LottieView
                // eslint-disable-next-line @typescript-eslint/no-require-imports
    source={require('../../assets/loading.json')}
                autoPlay
                loop
                speed={1}
                style={recordingScreenStyles.loadingLottie}
              />
            </SafeAreaView>
          ) : (
            <View style={recordingScreenStyles.messageContainer}>
              <Text style={recordingScreenStyles.message}>{question}</Text>
            </View>
          )}
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
              // eslint-disable-next-line @typescript-eslint/no-require-imports
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
      )}
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
                  onPress={handelExit}
                >
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
    </GestureHandlerRootView>
  );
}

export default Conversation;
