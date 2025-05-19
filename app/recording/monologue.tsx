import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Pressable, Modal, BackHandler } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectMoodTab from '@/components/SelectMoodMeterTab';
import usePostMonologue from '@/hooks/usePostMonologue';
import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';
import LoadingScreen from '@/components/Loading';
import useShowToast from '@/hooks/useShowToast';
import { useRouter } from 'expo-router';
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

function Monologue() {
  const router = useRouter();
  const showToast = useShowToast();
  const [showExitModal, setShowExitModal] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const { mutate: sendMonologue, data, isSuccess, isPending} = usePostMonologue();

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
      stopRecording();
      showToast('error', '녹음 실패', '독백 서비스를 다시 시도해주세요.');
      router.push('/record');
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

  const onPressSubmitButton = async () => {
    if (!isRecording) {
      showToast('error', '서비스 에러', '독백 서비스를 다시 시도해주세요.');
      router.push('/record');
      return;
    }
    const uri = await stopRecording();
    if (!uri) return;

    sendMonologue(uri);
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
      {isPending ? (
        <LoadingScreen />
      ) : (
        <View style={recordingScreenStyles.recordScreen}>
          <View style={recordingScreenStyles.messageContainer}>
            <Text style={recordingScreenStyles.message}>당신의 하루를 들려주세요</Text>
          </View>
          <SafeAreaView style={recordingScreenStyles.recordingContainer}>
            <LottieView
              source={require('../../assets/RecordingAnimation.json')}
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
      {isSuccess && data && (
        <SelectMoodTab diaryId={data.diaryId}/>
      )}
    </GestureHandlerRootView>
  );
};

export default Monologue;
