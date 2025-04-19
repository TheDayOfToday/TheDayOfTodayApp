import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { analysisScreenStyles } from '@/styles/analysisScreenStyles';

function AnalysisScreen() {
  const [title, setTitle] = useState('');
  const [feedback, setFeedback] = useState('');
  const [degree, setDegree] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 오늘 날짜를 기준으로 selectedDate 생성
  const today = new Date();
  const selectedDate = today.toISOString().split('T')[0]; // "YYYY-MM-DD"

  // 주차 계산 함수
  const getWeekNumber = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const pastDays = date.getDate() + firstDay.getDay() - 1;
    return Math.floor(pastDays / 7) + 1;
  };

  useEffect(() => {
    const fetchWeeklyAnalysis = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('토큰이 없습니다.');
        return;
      }

      const [year, month, day] = selectedDate.split('-').map(Number);
      const week = getWeekNumber(new Date(year, month - 1, day));

      try {
        const res = await fetch(`https://thedayoftoday.kro.kr/weeklyAnalysis/${year}/${month}/${week}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });

        if (!res.ok) throw new Error('서버 응답 실패');

        const data = await res.json();
        setTitle(data.title);
        setFeedback(data.feedback);
        setDegree(data.degree);
        setDateRange(`${data.startDate} ~ ${data.endDate}`);
        console.log('주간 분석 데이터:', data);        
      } catch (err: any) {
        setError(err.message || '에러 발생');
      }
    };

    fetchWeeklyAnalysis();
  }, []);

  return (
    <ScrollView
      style={analysisScreenStyles.Screen}
      contentContainerStyle={analysisScreenStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={analysisScreenStyles.headerContainer}>
        <FontAwesome name="circle-thin" size={200} color="#191d42" />
        <Text style={analysisScreenStyles.headerText}>이번 주 일기 분석</Text>
      </View>

      <View style={analysisScreenStyles.contentContainer}>
        {error ? (
          <Text style={{ color: 'red' }}>{error}</Text>
        ) : (
          <>
            <Text style={analysisScreenStyles.contentTitle}>{title}</Text>
            <Text style={analysisScreenStyles.contentDegree}>감정 상태: {degree}</Text>
            <Text style={analysisScreenStyles.contentFeedback}>{feedback}</Text>
            <Text style={analysisScreenStyles.contentDate}>분석 기간: {dateRange}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default AnalysisScreen;
