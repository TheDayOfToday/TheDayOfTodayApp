import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { calendarModalStyles } from '@/styles/calendarModalStyles';
import { styles } from '../../styles/calendarScreenStyles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCalendarData } from '@/hooks/useCalendarData';
import { getCalendarColor } from '@/api/diary';

function CalendarScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateObj, setSelectedDateObj] = useState(new Date());
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [moodColorsReady, setMoodColorsReady] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'diary' | 'analysis'>('diary');
  const selectedDate = selectedDateObj.toISOString().split('T')[0];
  const [year, month, day] = selectedDate.split('-');
  const date = useMemo(() => ({ year, month, day }), [year, month, day]);
  const { data, isLoading, error } = useCalendarData(date, modalVisible);

  // 📌 감정 색상 전체 가져오기 (한 달 단위)
  useEffect(() => {
    const fetchAllMoodColors = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) return;

      try {
        const thisYear = new Date().getFullYear();
        const monthRequests = [];

        for (let m = 1; m <= 12; m++) {
          const monthStr = m.toString().padStart(2, '0');
          monthRequests.push(
            getCalendarColor(token, {
              year: thisYear.toString(),
              month: monthStr,
              day: '01',
            })
          );
        }

        const results = await Promise.all(monthRequests);
        const allColors: { [key: string]: string } = {};
        results.forEach((res) => Object.assign(allColors, res?.colors ?? {}));

        setMarkedDates(() => {
          const updated: { [key: string]: any } = {};
          Object.entries(allColors).forEach(([date, color]) => {
            updated[date] = { dotColor: color };
          });
          return updated;
        });

        setMoodColorsReady(true);
      } catch (err) {
        console.error('감정 색상 불러오기 실패:', err);
      }
    };

    fetchAllMoodColors();
  }, []);

  const moveDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDateObj);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDateObj(newDate);
  };

  const handleDayPress = (day: any) => {
    setSelectedDateObj(new Date(day.dateString));
    setModalVisible(true);
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
                    {/* <Text style={calendarModalStyles.moodTag}>#{data.analysisEntry.analysis ?? '정보 없음'}</Text> */}
                    <Text style={calendarModalStyles.analysisText}>{data.analysisEntry.analysis}</Text>
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
