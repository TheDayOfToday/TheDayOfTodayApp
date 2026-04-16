import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import React from 'react';
import { SafeAreaView, View, Text, Pressable, Modal } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { LoadingScreen } from '@/src/components/common/Loading';
import { SelectMoodTab } from '@/src/components/common/SelectMoodMeterTab';
import { useConversationFlow } from '@/src/hooks/useConversationFlow';
import { ModalStyles } from '@/src/styles/modalStyles';
import { recordingScreenStyles } from '@/src/styles/recordingScreenStyles';

function Conversation() {
  const {
    isRecording,
    isNextPending,
    isEndPending,
    isSuccess,
    numericDiaryId,
    question,
    showExitModal,
    isNextButtonDisabled,
    onPressNextButton,
    onPressRecordButton,
    onPressSubmitButton,
    handleExit,
    closeExitModal,
  } = useConversationFlow();

  return (
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
                isNextButtonDisabled && recordingScreenStyles.disabledOpacity,
              ]}
              onPress={onPressNextButton}
              disabled={isNextButtonDisabled}
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
              ) : (
                <FontAwesome name="circle" size={40} color="#fff" />
              )}
            </Pressable>
            <Pressable
              style={[
                recordingScreenStyles.completeButton,
                isRecording && recordingScreenStyles.disabledOpacity,
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
          onRequestClose={closeExitModal}
        >
          <View style={ModalStyles.modalOverlay}>
            <View style={ModalStyles.modalContent}>
              <Text style={ModalStyles.modalTitle}>종료하시겠습니까?</Text>
              <Text style={ModalStyles.modalSubtitle}>작성된 내용이 없어 저장되지 않습니다.</Text>
              <View style={ModalStyles.modalButtonContainer}>
                <Pressable
                  style={ModalStyles.finishButton}
                  onPress={handleExit}
                >
                  <Text style={ModalStyles.finishButtonText}>확인</Text>
                </Pressable>
                <Pressable
                  style={ModalStyles.cancelButton}
                  onPress={closeExitModal}
                >
                  <Text style={ModalStyles.cancelButtonText}>취소</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {isSuccess && (
        <SelectMoodTab diaryId={numericDiaryId} />
      )}
    </GestureHandlerRootView>
  );
}

export default Conversation;
