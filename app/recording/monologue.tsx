import LottieView from 'lottie-react-native';
import React from 'react';
import { SafeAreaView, View, Text, Pressable, Modal } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { LoadingScreen } from '@/src/components/common/Loading';
import { SelectMoodTab } from '@/src/components/common/SelectMoodMeterTab';
import { useMonologue } from '@/src/hooks/useMonologue';
import { ModalStyles } from '@/src/styles/modalStyles';
import { recordingScreenStyles } from '@/src/styles/recordingScreenStyles';

function Monologue() {
  const {
    isPending,
    isSuccess,
    diaryId,
    showExitModal,
    onPressSubmitButton,
    handleExit,
    closeExitModal,
  } = useMonologue();

  return (
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
              // eslint-disable-next-line @typescript-eslint/no-require-imports
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
      {isSuccess && diaryId && (
        <SelectMoodTab diaryId={diaryId} />
      )}
    </GestureHandlerRootView>
  );
}

export default Monologue;
