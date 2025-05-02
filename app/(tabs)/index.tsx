import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Pressable } from 'react-native';
import useToken from '@/hooks/useToken';
import useShowToast from '@/hooks/useShowToast';
import { Calendar } from 'react-native-calendars';
import { calendarModalStyles } from '@/styles/calendarModalStyles';
import { styles } from '../../styles/calendarScreenStyles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useDeleteDiary from '@/hooks/useDeleteDiary';
import { useCalendarData } from '@/hooks/useCalendarData';
import { CalendarRequest } from '@/api/diary/entity';
import { getAnalysis } from '@/api/diary';

function CalendarScreen() {
  const token = useToken();
  const showToast = useShowToast();
  const { mutate: deleteDiary } = useDeleteDiary();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateObj, setSelectedDateObj] = useState(new Date());
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [moodColorsReady, setMoodColorsReady] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'diary' | 'analysis'>('diary');

  const selectedDate = selectedDateObj.toISOString().split('T')[0];
  const [year, month, day] = selectedDate.split('-');

  const { data, isLoading, error } = useCalendarData({ year, month, day }, modalVisible);

  // 📌 감정 색상 전체 가져오기 
  useEffect(() => {
    const fetchMoodColors = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) return;

      const startDate = new Date(2025, 1, 1);
      const today = new Date();
      const newMarked: { [key: string]: any } = {};
      const requests: Promise<void>[] = [];

      const formatDate = (d: Date) => d.toISOString().split('T')[0];

      while (startDate <= today) {
        const dateStr = formatDate(startDate);
        const [y, m, d] = dateStr.split('-');

        const requestData: CalendarRequest = { year: y, month: m, day: d };

        const req = getAnalysis(token, requestData)
          .then(data => {
            const result = data?.analysisResults?.[0];
            const moodColor = result?.diaryMood?.moodColor;
            if (moodColor) {
              newMarked[dateStr] = {
                marked: true,
                dotColor: moodColor,
              };
            }
          })
          .catch(err => console.warn(`${dateStr} 불러오기 실패`, err));

        requests.push(req);
        startDate.setDate(startDate.getDate() + 1);
      }

      await Promise.all(requests);
      setMarkedDates(newMarked);
      setMoodColorsReady(true);
    };

    fetchMoodColors();
  }, []);

  // 📌 분석 데이터로 날짜 마킹 업데이트
  useEffect(() => {
    if (data?.analysisEntry?.diaryMood?.moodColor) {
      setMarkedDates(prev => ({
        ...prev,
        [selectedDate]: {
          marked: true,
          dotColor: data.analysisEntry.diaryMood.moodColor,
        },
      }));
    }
  }, [data]);

  const moveDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDateObj);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDateObj(newDate);
  };

  const handleDayPress = (day: any) => {
    setSelectedDateObj(new Date(day.dateString));
    setModalVisible(true);
  };

  // 삭제 버튼
  const handleDeleteDiary = async() => {
    if (!data?.diaryEntry) {
      showToast('error', '삭제 실패', '삭제할 일기가 없습니다.');
      return;
    }

    try {
      await deleteDiary({
        token: token!,
        data: { year, month, day },
      });
      showToast('success', '삭제 완료', '일기가 삭제되었습니다.');
      setModalVisible(false);
    } catch (error) {
      showToast('error', '삭제 실패', '일기를 삭제하는 데에 실패했습니다.');
    }
  };

  const CustomDay = ({ date, state, marking }: any) => (
    <Pressable onPress={() => handleDayPress(date)} style={styles.dayContainer}>
      <View style={styles.circleIcon}>
        <View style={[styles.circle, marking?.dotColor && { backgroundColor: marking.dotColor }]} />
      </View>
      <Text style={[styles.dayText, state === 'disabled' && styles.disabledText]}>
        {date.day}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {moodColorsReady ? (
          <Calendar
            style={styles.calendar}
            current={new Date().toISOString().split('T')[0]}
            onDayPress={handleDayPress}
            markingType="custom"
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
              {/* 날짜 이동 */}
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
              {/* 탭 */}
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

              {/* 데이터 표시 */}
              {isLoading ? (
                <Text>불러오는 중...</Text>
              ) : error ? (
                <Text style={{ color: 'red' }}>{error.message}</Text>
              ) : selectedTab === 'diary' ? (
                data?.diaryEntry ? (
                  <View style={calendarModalStyles.tabContent}>
                    <Text style={calendarModalStyles.diaryTitle}>{data.diaryEntry.title}</Text>
                    <Text style={calendarModalStyles.diaryText}>{data.diaryEntry.content}</Text>
                  </View>
                ) : (
                  <Text>일기 없음</Text>
                )
              ) : (
                data?.analysisEntry ? (
                  <View style={calendarModalStyles.tabContent}>
                    <Text style={calendarModalStyles.moodTag}>#{data.analysisEntry.diaryMood?.moodName ?? '정보 없음'}</Text>
                    <Text style={calendarModalStyles.analysisText}>{data.analysisEntry.content}</Text>
                  </View>
                ) : (
                  <Text>분석 없음</Text>
                )
              )}
              <View style={calendarModalStyles.modalButtonContainer}>
                <TouchableOpacity style={calendarModalStyles.deleteDiaryButton} onPress={() => handleDeleteDiary()}>
                  <Text style={calendarModalStyles.deleteDiaryButtonText}>삭제</Text>
                </TouchableOpacity>
                <TouchableOpacity style={calendarModalStyles.modalButton} onPress={() => setModalVisible(false)}>
                  <Text style={calendarModalStyles.modalButtonText}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

export default CalendarScreen;
