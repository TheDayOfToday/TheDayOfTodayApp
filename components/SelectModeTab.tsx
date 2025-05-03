import React, { useState, useCallback, useRef, useMemo } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { useFocusEffect, useRoute, RouteProp } from '@react-navigation/native';
import useToken from '@/hooks/useToken';
import useShowToast from '@/hooks/useShowToast';
import { useDiaryEntry } from '@/hooks/useDiaryEntry';
import useDeleteDiary from '@/hooks/useDeleteDiary';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { modeSlidingTabStyles } from '@/styles/modeSlidingTabStyles';
import { deleteDiaryModalStyles } from '@/styles/deleteDiaryModalStyles';

type SelectModeTabRouteProp = RouteProp<
  { recording: { openBottomSheet?: boolean } },
  'recording'
>;

interface SelectModeTabProps {
  selectMode: (mode: string) => void;
};

function SelectModeTab({ selectMode }: SelectModeTabProps) {
  const token = useToken();
  const showToast = useShowToast();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%", "100%"], []);
  const route = useRoute<SelectModeTabRouteProp>();
  // const currentRoute = useNavigationState(state => state.routes[state.index]?.name)
  
  const today = new Date();
  const todayDate = {
    year: String(today.getFullYear()),
    month: String(today.getMonth() + 1).padStart(2, '0'),
    day: String(today.getDate()).padStart(2, '0'),
  };
  const diary = useDiaryEntry(todayDate, true);
  const [modalVisible, setModalVisible] = useState(false);
  const { mutate: deleteDiary } = useDeleteDiary();

  // 기록 화면에 있을 때 슬라이딩 탭 오픈
  useFocusEffect(
    useCallback(() => {
      if (route.params?.openBottomSheet) {
        sheetRef.current?.snapToIndex(0);
      }
    }, [route.params?.openBottomSheet])
  );

  // 독백 버튼 클릭 시 핸들러 함수
  const onPressMonologue = useCallback(() => {
    if (diary.data) {
      setModalVisible(true);
      return;
    }
    selectMode('MonologueMode');
    sheetRef.current?.close();
  }, [selectMode]);

  // 대화 버튼 클릭 시 핸들러 함수
  const onPressConversation = useCallback(() => {
    // 대화 모드 구현을 위한 임시 처리
    // if (data?.diaryEntry) {
    //   setModalVisible(true);
    //   return;
    // }
    selectMode('ConversationMode');
    sheetRef.current?.close();
  }, [selectMode]);

  const onPressDeleteDiary = async() => {
    try {
      await deleteDiary({
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
      enableDynamicSizing={false} // snapPoints로 시트 크기 고정
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
            <View style={deleteDiaryModalStyles.modalOverlay}>
              <View style={deleteDiaryModalStyles.modalContent}>
                <Text style={deleteDiaryModalStyles.modalTitle}>오늘의 일기가 이미 있습니다.</Text>
                <Text style={deleteDiaryModalStyles.modalSubtitle}>기존 일기를 삭제하시겠습니까?</Text>
                <View style={deleteDiaryModalStyles.modalButtonContainer}>
                  <Pressable
                    style={deleteDiaryModalStyles.deleteDiaryButton}
                    onPress={() => {
                      onPressDeleteDiary();
                      setModalVisible(false)
                    }
                  }>
                    <Text style={deleteDiaryModalStyles.deleteDiaryButtonText}>삭제</Text>
                  </Pressable>
                  <Pressable
                    style={deleteDiaryModalStyles.modalButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={deleteDiaryModalStyles.modalButtonText}>취소</Text>
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
