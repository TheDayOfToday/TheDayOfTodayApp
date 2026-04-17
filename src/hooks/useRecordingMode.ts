import BottomSheet from '@gorhom/bottom-sheet';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState, useCallback, useRef, useMemo } from 'react';

import type { RouteProp } from '@react-navigation/native';

import useShowToast from '@/src/hooks/useShowToast';
import { useToken } from '@/src/hooks/useToken';
import { useDiaryEntry } from '@/src/queries/useCalendarQuery';
import { useDeleteDiary } from '@/src/queries/useDiaryQuery';
import { useConversationStart } from '@/src/queries/useRecordQuery';

type SelectModeTabRouteProp = RouteProp<
  { recording: { openBottomSheet?: boolean } },
  'recording'
>;

export const useRecordingMode = () => {
  const token = useToken();
  const showToast = useShowToast();
  const router = useRouter();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['35%', '100%'], []);
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
  const { mutateAsync: startConversation } = useConversationStart();

  useFocusEffect(
    useCallback(() => {
      if (route.params?.openBottomSheet) {
        sheetRef.current?.snapToIndex(0);
      }
    }, [route.params?.openBottomSheet]),
  );

  const onPressMonologue = () => {
    if (diary.data) {
      setModalVisible(true);
      return;
    }
    sheetRef.current?.close();
    router.push('/recording/monologue');
  };

  const onPressConversation = async () => {
    if (diary.data) {
      setModalVisible(true);
      return;
    }
    try {
      const response = await startConversation(token!);
      const diaryId = response?.diaryId;
      if (!diaryId) {
        showToast('error', '대화 시작 실패', '서버 응답에 diaryId가 없습니다.');
        return;
      }
      sheetRef.current?.close();
      router.push({
        pathname: '/recording/conversation',
        params: { diaryId: diaryId.toString() },
      });
    } catch {
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
    } catch {
      showToast('error', '삭제 실패', '일기를 삭제하는 데에 실패했습니다.');
    }
  };

  const closeModal = () => setModalVisible(false);

  const onPressDeleteAndClose = () => {
    onPressDeleteDiary();
    setModalVisible(false);
  };

  return {
    sheetRef,
    snapPoints,
    modalVisible,
    onPressMonologue,
    onPressConversation,
    onPressDeleteAndClose,
    closeModal,
  };
};
