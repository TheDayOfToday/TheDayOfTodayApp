import { useState } from 'react';

import { useCalendarNavigation } from '@/src/hooks/useCalendarNavigation';
import useDoubleBackExit from '@/src/hooks/useDoubleBackExit';
import useShowToast from '@/src/hooks/useShowToast';
import { useToken } from '@/src/hooks/useToken';
import { useAnalysisEntry, useCalendarColors, useDiaryEntry } from '@/src/queries/useCalendarQuery';
import { useDeleteDiary } from '@/src/queries/useDiaryQuery';

export const useCalendarScreen = () => {
  const token = useToken();
  const showToast = useShowToast();
  const { mutateAsync: deleteDiary } = useDeleteDiary();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'diary' | 'analysis'>('diary');

  const { calendarDate, year, month, day, formattedDate, moveDate, selectDate } =
    useCalendarNavigation();

  const diary = useDiaryEntry(calendarDate, modalVisible);
  const analysis = useAnalysisEntry(calendarDate, modalVisible);
  const { markedDates } = useCalendarColors();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDayPress = (day: any) => {
    selectDate(day.dateString);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const handleDeleteDiary = () => {
    if (!diary.data) {
      showToast('error', '삭제 실패', '삭제할 일기가 없습니다.');
      return;
    }

    try {
      deleteDiary({
        token: token!,
        data: { year, month, day },
      });
      showToast('success', '삭제 완료', '일기가 삭제되었습니다.');
      setModalVisible(false);
    } catch {
      showToast('error', '삭제 실패', '일기를 삭제하는 데에 실패했습니다.');
    }
  };

  useDoubleBackExit(!modalVisible);

  return {
    modalVisible,
    selectedTab,
    setSelectedTab,
    formattedDate,
    markedDates,
    diary,
    analysis,
    moveDate,
    handleDayPress,
    closeModal,
    handleDeleteDiary,
  };
};
