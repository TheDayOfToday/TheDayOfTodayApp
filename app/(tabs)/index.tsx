import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { calendarModalStyles } from '@/styles/calendarModalStyles';
import { styles } from '../../styles/calendarScreenStyles';
import { Ionicons } from '@expo/vector-icons';

function CalendarScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateObj, setSelectedDateObj] = useState(new Date());
  const selectedDate = selectedDateObj.toISOString().split('T')[0];

  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [selectedTab, setSelectedTab] = useState<'diary' | 'analysis'>('diary');

  const [diaryData, setDiaryData] = useState<{ title: string, content: string } | null>(null);
  const [analysisData, setAnalysisData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);  

  // 모달 폼 내에서 날짜 옮기는 함수
  const moveDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDateObj);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDateObj(newDate);
  };

  // 날짜 클릭 시 해당 날짜 선택 및 모달 폼 여는 함수
  const handleDayPress = (day: any) => {
    const date = day.dateString;
    setSelectedDateObj(new Date(date));
    setModalVisible(true);
  };

  // 모달 폼 열릴 때 해당 날짜의 일기 및 분석 내용 데이터 요청
  useEffect(() => {
    const fetchDiaryAndAnalysis = async () => {
      setIsLoading(true);
      setDiaryData(null);
      setAnalysisData(null);
      setError(null); 

      const accessToken = localStorage.getItem('accessToken');
      console.log('accessToken : ', accessToken);

      if (!accessToken) {
        setError('로그인 정보가 없습니다.');
        setIsLoading(false);
        return;
      }

      const [year, month, day] = selectedDate.split('-');

      try {
        const [diaryRes, analysisRes] = await Promise.all([
          fetch(`https://thedayoftoday.kro.kr/calendar/diary/${year}/${month}/${day}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch(`https://thedayoftoday.kro.kr/calendar/analysis/${year}/${month}/${day}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        ]);

        if (!diaryRes.ok || !analysisRes.ok) throw new Error('데이터 요청 실패');
        else console.log('정상 연결됨');

        const diaryJson = await diaryRes.json();
        const analysisJson = await analysisRes.json();

        setDiaryData(diaryJson);
        setAnalysisData(analysisJson.analysis);
      } catch (err: any) {
        setError(err.message || '에러 발생');
      } finally {
        setIsLoading(false);
      }

      setMarkedDates({
        [selectedDate]: {
          selected: true,
          selectedTextColor: 'skyblue',
          marked: true,
        },
      });
    };

    if (modalVisible) {
      fetchDiaryAndAnalysis();
    }
  }, [selectedDateObj]);

  // 날짜 커스텀
  const CustomDay = ({ date, state, marking }: any) => {
    const isSelected = marking?.selected;
    return (
      <View style={styles.dayContainer}>
        <Text style={[
          styles.dayText,
          state === 'disabled' && styles.disabledText,
          isSelected && styles.selectedDayText,
          isSelected && { color: marking?.selectedTextColor },
        ]}>
          {date.day}
        </Text>
        <Pressable onPress={() => handleDayPress(date)} style={styles.circleIcon}>
          <View style={[styles.circle, marking?.marked && styles.markedCircle]} />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          current={'2025-01-01'}
          onDayPress={handleDayPress}
          markingType="custom"
          markedDates={markedDates}
          dayComponent={CustomDay}
        />

        {/* 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* 날짜 + 화살표 */}
              <View style={calendarModalStyles.dateRow}>
                <TouchableOpacity onPress={() => moveDate('prev')}>
                  <Ionicons
                    name="chevron-back"
                    size={20}
                    color="#00BFFF"
                    style={calendarModalStyles.arrowIcon}
                  />
                </TouchableOpacity>
                <Text style={calendarModalStyles.dateText}>
                  {new Date(selectedDate).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
                <TouchableOpacity onPress={() => moveDate('next')}>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color='#00BFFF'
                    style={calendarModalStyles.arrowIcon}
                  />
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
              {/* 내용 */}
              {isLoading ? (
                <Text>불러오는 중...</Text>
              ) : error ? (
                <Text style={{ color: 'red' }}>{error}</Text>
              ) : selectedTab === 'diary' ? (
                diaryData ? (
                  <View style={calendarModalStyles.tabContent}>
                    <Text style={calendarModalStyles.diaryTitle}>{diaryData.title}</Text>
                    <Text style={calendarModalStyles.diaryText}>{diaryData.content}</Text>
                  </View>
                ) : (
                  <Text>일기 없음</Text>
                )
              ) : (
                <View style={calendarModalStyles.tabContent}>
                  <Text style={calendarModalStyles.analysisText}>{analysisData ?? '분석 없음'}</Text>
                </View>
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
