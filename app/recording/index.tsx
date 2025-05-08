import React, { useState, useCallback, useRef, useMemo } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { useRouter } from "expo-router";
import { useFocusEffect, useRoute, RouteProp } from '@react-navigation/native';
import useToken from '@/hooks/useToken';
import useShowToast from '@/hooks/useShowToast';
import { useDiaryEntry } from '@/hooks/useDiaryEntry';
import useDeleteDiary from '@/hooks/useDeleteDiary';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import useConversationStart from '@/hooks/useConversationStart';
import { modeSlidingTabStyles } from '@/styles/modeSlidingTabStyles';
import { ModalStyles } from '@/styles/modalStyles';

type SelectModeTabRouteProp = RouteProp<
  { recording: { openBottomSheet?: boolean } },
  'recording'
>;

function SelectModeTab() {
  const token = useToken();
  const showToast = useShowToast();
  const router = useRouter();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%", "100%"], []);
  const route = useRoute<SelectModeTabRouteProp>();
  
  const today = new Date();
  const todayDate = {
    year: String(today.getFullYear()),
    month: String(today.getMonth() + 1),
    day: String(today.getDate()),
  };
  const diary = useDiaryEntry(todayDate, true);
  const [modalVisible, setModalVisible] = useState(false);
  const { mutateAsync: deleteDiary } = useDeleteDiary();

  const { mutateAsync: startConversation, data } = useConversationStart();

  // 기록 화면에 있을 때 슬라이딩 탭 오픈
  useFocusEffect(
    useCallback(() => {
      if (route.params?.openBottomSheet) {
        sheetRef.current?.snapToIndex(0);
      }
    }, [route.params?.openBottomSheet])
  );

  // 독백 버튼 클릭 시 핸들러 함수
  const onPressMonologue = () => {
    if (diary.data) {
      setModalVisible(true);
      return;
    }
    sheetRef.current?.close();
    router.push('/recording/monologue');
  };

  // 대화 버튼 클릭 시 핸들러 함수
  const onPressConversation = async () => {
    if (diary.data) {
      setModalVisible(true);
      return;
    }
    try {
      const response = await startConversation(token);
      const diaryId = response?.diaryId;
      if(!diaryId) {
        showToast('error', '대화 시작 실패', '서버 응답에 diaryId가 없습니다.');
        return;
      }
      sheetRef.current?.close();
      router.push({
        pathname: '/recording/conversation',
        params: { diaryId: diaryId.toString() },
      });
    } catch (error) {
      showToast('error', '대화 시작 실패', '서버와 통신 중 문제가 발생했습니다.');
    }
  };

  const onPressDeleteDiary = () => {
    try {
      deleteDiary({
        token: token!,
        data: todayDate,
      });
      showToast('success', '삭제 완료', '일기가 삭제되었습니다.');
      setModalVisible(false);
    } catch (error) {
      showToast('error', '삭제 실패', '일기를 삭제하는 데에 실패했습니다.');
    }
  }

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
          <Text style={modeSlidingTabStyles.sheetHeaderTitle}>일기 작성 모드를 선택해주세요</Text>
        </View>
        <View style={modeSlidingTabStyles.recordButtonContainer}>
          <Pressable style={modeSlidingTabStyles.recordButton} onPress={() => onPressMonologue()}>
            <Text style={modeSlidingTabStyles.recordButtonText}>독백</Text>
          </Pressable>
          <Pressable style={modeSlidingTabStyles.recordButton} onPress={() => onPressConversation()}>
            <Text style={modeSlidingTabStyles.recordButtonText}>대화</Text>
          </Pressable>
        </View>
        {modalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={ModalStyles.modalOverlay}>
              <View style={ModalStyles.modalContent}>
                <Text style={ModalStyles.modalTitle}>오늘의 일기가 이미 있습니다.</Text>
                <Text style={ModalStyles.modalSubtitle}>기존 일기를 삭제하시겠습니까?</Text>
                <View style={ModalStyles.modalButtonContainer}>
                  <Pressable
                    style={ModalStyles.deleteDiaryButton}
                    onPress={() => {
                      onPressDeleteDiary();
                      setModalVisible(false)
                    }
                  }>
                    <Text style={ModalStyles.deleteDiaryButtonText}>삭제</Text>
                  </Pressable>
                  <Pressable
                    style={ModalStyles.cancelButton}
                    onPress={() => setModalVisible(false)}
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
};

export default SelectModeTab;
