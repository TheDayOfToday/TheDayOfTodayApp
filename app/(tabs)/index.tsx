import React, { useState, useMemo } from 'react';
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { calendarModalStyles } from '@/styles/calendarModalStyles';
import { styles } from '../../styles/calendarScreenStyles';
import { Ionicons } from '@expo/vector-icons';
import { useDiaryEntry } from '@/hooks/useDiaryEntry';
import { useAnalysisEntry } from '@/hooks/useAnalysisEntry';
import { useCalendarColors } from '@/hooks/useCalendarColor';

function CalendarScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateObj, setSelectedDateObj] = useState(new Date());
  const [calendarVersion, setCalendarVersion] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'diary' | 'analysis'>('diary');
  const selectedDate = selectedDateObj.toISOString().split('T')[0];
  const [year, month, day] = selectedDate.split('-');
  const calendarDate = useMemo(() => ({ year, month, day }), [year, month, day]);  

  const diary = useDiaryEntry(calendarDate, modalVisible);
  const analysis = useAnalysisEntry(calendarDate, modalVisible);
  const { markedDates, moodColorsReady } = useCalendarColors(calendarVersion);

  const moveDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDateObj);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDateObj(newDate);
  };

  const handleDayPress = (day: any) => {    
    setSelectedDateObj(new Date(day.dateString));
    setModalVisible(true);
  };

  const handleDiaryUpdate = () => {
    setCalendarVersion((prev) => prev + 1);
    // setModalVisible(false);
  }

   // 캘린더 진입 시마다 다이어리 업데이트(리패치) 실행
  useFocusEffect(
    useCallback(() => {
      handleDiaryUpdate();
    }, [])
  );

  const CustomDay = ({ date, state, marking }: any) => {
    const today = new Date();
    const isToday =
      Number(date.year) === today.getFullYear() &&
      Number(date.month) === today.getMonth() + 1 &&
      Number(date.day) === today.getDate();
  
    const circleBorderStyle = isToday
      ? { borderColor: '#00BFFF', borderWidth: 2 }
      : {};
  
    const dayTextStyle = [
      styles.dayText,
      state === 'disabled' && styles.disabledText,
      isToday && { color: '#00BFFF' },
    ];
  
    return (
      <Pressable onPress={() => handleDayPress(date)} style={styles.dayContainer}>
        <View style={styles.circleIcon}>
          <View
            style={[
              styles.circle,
              marking?.dotColor && { backgroundColor: marking.dotColor },
              circleBorderStyle,
            ]}
          />
        </View>
        <Text style={dayTextStyle}>{date.day}</Text>
      </Pressable>
    );
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {moodColorsReady ? (
          <Calendar     
            style={styles.calendar}
            current={new Date().toISOString().split('T')[0]}
            onDayPress={handleDayPress}
            key={JSON.stringify(markedDates)}
            markingType="multi-dot"
            markedDates={markedDates}            
            dayComponent={CustomDay}
          />
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>달력 준비 중...</Text>
        )}

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
                  <Ionicons name="chevron-back" size={20} color="#00BFFF" style={calendarModalStyles.arrowIcon} />
                </TouchableOpacity>
                <Text style={calendarModalStyles.dateText}>
                  {new Date(selectedDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Text>
                <TouchableOpacity onPress={() => moveDate('next')}>
                  <Ionicons name="chevron-forward" size={20} color="#00BFFF" style={calendarModalStyles.arrowIcon} />
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
                  <View style={calendarModalStyles.tabContent}>
                    <Text style={calendarModalStyles.diaryTitle}>{diary.data.title}</Text>
                    <Text style={calendarModalStyles.diaryText}>{diary.data.content}</Text>
                  </View>
                ) : (
                  <Text>일기 없음</Text>
                )
              ) : (
                analysis.isLoading ? (
                  <Text>분석 불러오는 중...</Text>
                ) : analysis.data ? (
                  <View style={calendarModalStyles.tabContent}>
                    <Text style={calendarModalStyles.analysisText}>{analysis.data.analysis}</Text>
                  </View>
                ) : (
                  <Text>분석 없음</Text>
                )
              )}

              <TouchableOpacity style={calendarModalStyles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={calendarModalStyles.modalButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

export default CalendarScreen;
