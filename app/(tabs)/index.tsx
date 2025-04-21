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
  const [analysisData, setAnalysisData] = useState<{ content: string, moodName: string, moodColor: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [moodColorsReady, setMoodColorsReady] = useState(false);

  const moveDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDateObj);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDateObj(newDate);
  };

  const handleDayPress = (day: any) => {
    const date = day.dateString;
    setSelectedDateObj(new Date(date));
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchMoodColorsFromFeb2025 = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
  
      const startDate = new Date(2025, 1, 1);
      const today = new Date();
      const newMarked: { [key: string]: any } = {};
      const requests: Promise<void>[] = [];
  
      const formatDate = (d: Date) => d.toISOString().split('T')[0];
  
      while (startDate <= today) {
        const dateStr = formatDate(startDate);
        const [year, month, day] = dateStr.split('-');
  
        const url = `https://thedayoftoday.kro.kr/calendar/analysis/${year}/${month}/${day}`;
  
        const req = fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => res.ok ? res.json() : null)
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
          .catch(err => console.warn(`❌ ${dateStr} 불러오기 실패`, err));
  
        requests.push(req);
        startDate.setDate(startDate.getDate() + 1);
      }
  
      await Promise.all(requests);
      setMarkedDates(newMarked);
      setMoodColorsReady(true); // ✅ 완료 표시
    };
  
    fetchMoodColorsFromFeb2025();
  }, []);    

  useEffect(() => {
    const fetchDiaryAndAnalysis = async () => {
      setIsLoading(true);
      setDiaryData(null);
      setAnalysisData(null);
      setError(null);

      const accessToken = localStorage.getItem('accessToken');
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

        const diaryJson = await diaryRes.json();
        const analysisJson = await analysisRes.json();

        if (diaryJson.entries && diaryJson.entries.length > 0) {
          setDiaryData({
            title: diaryJson.entries[0].title,
            content: diaryJson.entries[0].content,
          });
        } else {
          setDiaryData(null);
        }

        if (
          analysisJson.analysisResults &&
          analysisJson.analysisResults.length > 0
        ) {
          const result = analysisJson.analysisResults[0];
          setAnalysisData({
            content: result.content,
            moodName: result.diaryMood.moodName,
            moodColor: result.diaryMood.moodColor,
          });

          setMarkedDates((prev) => ({
            ...prev,
            [selectedDate]: {
              marked: true,
              dotColor: result.diaryMood.moodColor,
            },
          }));
        } else {
          setAnalysisData(null);
        }
      } catch (err: any) {
        setError(err.message || '에러 발생');
      } finally {
        setIsLoading(false);
      }
    };

    if (modalVisible) {
      fetchDiaryAndAnalysis();
    }
  }, [selectedDateObj]);

  const CustomDay = ({ date, state, marking }: any) => {
    return (
      <Pressable onPress={() => handleDayPress(date)} style={styles.dayContainer}>
        <View style={styles.circleIcon}>
          <View
            style={[
              styles.circle,
              marking?.dotColor && { backgroundColor: marking.dotColor },
            ]}
          />
        </View>
        <Text
          style={[
            styles.dayText,
            state === 'disabled' && styles.disabledText,
          ]}
        >
          {date.day}
        </Text>
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
              <View style={calendarModalStyles.dateRow}>
                <TouchableOpacity onPress={() => moveDate('prev')}>
                  <Ionicons name="chevron-back" size={20} color="#00BFFF" style={calendarModalStyles.arrowIcon} />
                </TouchableOpacity>
                <Text style={calendarModalStyles.dateText}>
                  {new Date(selectedDate).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
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
                  {analysisData ? (
                    <>
                      <Text style={calendarModalStyles.moodTag}>#{analysisData.moodName}</Text>
                      <Text style={calendarModalStyles.analysisText}>{analysisData.content}</Text>
                    </>
                  ) : (
                    <Text>분석 없음</Text>
                  )}
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
