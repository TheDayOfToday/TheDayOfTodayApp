import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';

import { useRecordingMode } from '@/src/hooks/useRecordingMode';
import { ModalStyles } from '@/src/styles/modalStyles';
import { modeSlidingTabStyles } from '@/src/styles/modeSlidingTabStyles';

function SelectModeTab() {
  const {
    sheetRef,
    snapPoints,
    modalVisible,
    onPressMonologue,
    onPressConversation,
    onPressDeleteAndClose,
    closeModal,
  } = useRecordingMode();

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      style={modeSlidingTabStyles.sheet}
      backgroundStyle={modeSlidingTabStyles.backgroundSheet}
    >
      <BottomSheetView style={modeSlidingTabStyles.sheetView}>
        <View style={modeSlidingTabStyles.sheetHeaderContainer}>
          <Text style={modeSlidingTabStyles.sheetHeaderTitle}>일기 작성 모드를</Text>
          <Text style={modeSlidingTabStyles.sheetHeaderTitle}>선택해주세요</Text>
        </View>
        <View style={modeSlidingTabStyles.recordButtonContainer}>
          <Pressable style={modeSlidingTabStyles.recordButton} onPress={onPressMonologue}>
            <Text style={modeSlidingTabStyles.recordButtonText}>독백</Text>
          </Pressable>
          <Pressable style={modeSlidingTabStyles.recordButton} onPress={onPressConversation}>
            <Text style={modeSlidingTabStyles.recordButtonText}>대화</Text>
          </Pressable>
        </View>
        {modalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={ModalStyles.modalOverlay}>
              <View style={ModalStyles.modalContent}>
                <Text style={ModalStyles.modalTitle}>오늘의 일기가 이미 있습니다.</Text>
                <Text style={ModalStyles.modalSubtitle}>기존 일기를 삭제하시겠습니까?</Text>
                <View style={ModalStyles.modalButtonContainer}>
                  <Pressable
                    style={ModalStyles.deleteDiaryButton}
                    onPress={onPressDeleteAndClose}
                  >
                    <Text style={ModalStyles.deleteDiaryButtonText}>삭제</Text>
                  </Pressable>
                  <Pressable
                    style={ModalStyles.cancelButton}
                    onPress={closeModal}
                  >
                    <Text style={ModalStyles.cancelButtonText}>취소</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}

export default SelectModeTab;
