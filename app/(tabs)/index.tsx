import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import useToken from '@/hooks/useToken';
import useShowToast from '@/hooks/useShowToast';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useDiaryEntry } from '@/hooks/useDiaryEntry';
import { useAnalysisEntry } from '@/hooks/useAnalysisEntry';
import useDeleteDiary from '@/hooks/useDeleteDiary';
import { useCalendarColors } from '@/hooks/useCalendarColor';
import LottieView from 'lottie-react-native';
import useDoubleBackExit from '@/hooks/useDoubleBackExit';
import { calendarModalStyles } from '@/styles/calendarModalStyles';
import { styles } from '../../styles/calendarScreenStyles';
import Book from '@/components/book';

function CalendarScreen() {
  const token = useToken();
  const showToast = useShowToast();
  const { mutateAsync: deleteDiary } = useDeleteDiary();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateObj, setSelectedDateObj] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState<'diary' | 'analysis'>('diary');
  const selectedDate = selectedDateObj.toISOString().split('T')[0];
  const [year, month, day] = selectedDate.split('-');
  const calendarDate = useMemo(() => ({ year, month, day }), [year, month, day]);  

  const diary = useDiaryEntry(calendarDate, modalVisible);
  const analysis = useAnalysisEntry(calendarDate, modalVisible);
  const { markedDates, moodColorsReady } = useCalendarColors();

  const moveDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDateObj);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDateObj(newDate);
  };

  const handleDayPress = (day: any) => {    
    setSelectedDateObj(new Date(day.dateString));
    setModalVisible(true);
  };

  const CustomDay = ({ date, state, marking }: any) => {
    const today = new Date();
    const isToday =
      Number(date.year) === today.getFullYear() &&
      Number(date.month) === today.getMonth() + 1 &&
      Number(date.day) === today.getDate();
  
    const dayTextStyle = [
      styles.dayText,
      state === 'disabled' && styles.disabledText,
      isToday && {
        fontFamily: 'Pretendard4',
        color: '#6478c4',
        borderBottomWidth: 2,
        borderBottomColor: '#6478c4',
      },
    ];
  
    return (
      <Pressable onPress={() => handleDayPress(date)} style={styles.dayContainer}>
        <Text style={dayTextStyle}>{date.day}</Text>
        <View
          style={[
            styles.circle,
            marking?.dotColor ? { backgroundColor: marking.dotColor } : { backgroundColor: '#777' },
          ]}
        />
      </Pressable>
    );
  };

  // 삭제 버튼
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
    } catch (error) {
      showToast('error', '삭제 실패', '일기를 삭제하는 데에 실패했습니다.');
    }
  };

  useDoubleBackExit(!modalVisible);

  return (
    <ScrollView
      style={styles.safeArea}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* {moodColorsReady ? ( */}
          <Calendar
            style={styles.calendar}
            theme={{
              calendarBackground: '#17171C', 
              monthTextColor: '#D6DEFD',
              textMonthFontSize: 18,
              textMonthFontFamily: 'Pretendard4',
              arrowColor: '#D6DEFD',
              textSectionTitleColor: '#D6DEFD',
            }}
            current={new Date().toISOString().split('T')[0]}
            onDayPress={handleDayPress}
            key={JSON.stringify(markedDates)}
            markingType="multi-dot"
            markedDates={markedDates}            
            dayComponent={CustomDay}
          />
        {/* ) : ( */}
          {/* <SafeAreaView style={styles.loadingLottieContainer}> */}
            {/* <LottieView */}
              {/* source={require('../../assets/loading.json')} */}
              {/* autoPlay */}
              {/* loop */}
              {/* speed={1} */}
              {/* style={styles.loadingLottie} */}
            {/* /> */}
          {/* </SafeAreaView> */}
        {/* )} */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={calendarModalStyles.dateRow}>
                <TouchableOpacity onPress={() => moveDate('prev')}>
                  <Ionicons name="chevron-back" size={20} color= "#96A0CC" style={calendarModalStyles.arrowIcon} />
                </TouchableOpacity>
                <Text style={calendarModalStyles.dateText}>
                  {new Date(selectedDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Text>
                <TouchableOpacity onPress={() => moveDate('next')}>
                  <Ionicons name="chevron-forward" size={20} color= "#96A0CC" style={calendarModalStyles.arrowIcon} />
                </TouchableOpacity>
              </View>
              <View style={calendarModalStyles.tabContainer}>
                <TouchableOpacity
                  style={[calendarModalStyles.tabButton, selectedTab === 'diary' && calendarModalStyles.selectedTab]}
                  onPress={() => setSelectedTab('diary')}
                >
                  <Text style={[calendarModalStyles.tabText, selectedTab === 'diary' && calendarModalStyles.selectedTabText]}>
                    이 날의 일기
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[calendarModalStyles.tabButton, selectedTab === 'analysis' && calendarModalStyles.selectedTab]}
                  onPress={() => setSelectedTab('analysis')}
                >
                  <Text style={[calendarModalStyles.tabText, selectedTab === 'analysis' && calendarModalStyles.selectedTabText]}>
                    AI 분석
                  </Text>
                </TouchableOpacity>
              </View>

              {selectedTab === 'diary' ? (
                diary.isLoading ? (
                  <Text>일기 불러오는 중...</Text>
                ) : diary.data ? (
                  <ScrollView style={calendarModalStyles.tabContent}>
                    <Text style={calendarModalStyles.diaryTitle}>{diary.data.title}</Text>
                    <Text style={calendarModalStyles.diaryText}>{diary.data.content}</Text>
                  </ScrollView>
                ) : (
                  <View style={calendarModalStyles.tabNoContent}>
                    <Text style={calendarModalStyles.diaryText}>일기 없음</Text>
                  </View>
                )
              ) : (
                analysis.isLoading ? (
                  <Text>분석 불러오는 중...</Text>
                ) : analysis.data ? (
                  <ScrollView style={calendarModalStyles.tabContent}>
                    <Text style={calendarModalStyles.analysisText}>{analysis.data.analysis}</Text>
                  </ScrollView>
                ) : (
                  <View style={calendarModalStyles.tabNoContent}>
                    <Text style={calendarModalStyles.analysisText}>분석 없음</Text>
                  </View>
                )
              )}
              <View style={calendarModalStyles.modalButtonContainer}>
                <Pressable style={calendarModalStyles.deleteDiaryButton} onPress={() => handleDeleteDiary()}>
                  <Text style={calendarModalStyles.deleteDiaryButtonText}>삭제</Text>
                </Pressable>
                <TouchableOpacity style={calendarModalStyles.modalButton} onPress={() => setModalVisible(false)}>
                  <Text style={calendarModalStyles.modalButtonText}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Book />
      </View>
    </ScrollView>
  );
}

export default CalendarScreen;
