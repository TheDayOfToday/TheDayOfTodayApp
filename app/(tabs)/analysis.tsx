import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { Image } from 'react-native';
import useGetWeeklyAnalysis from '@/hooks/useGetWeeklyAnalysis';
import useToken from '@/hooks/useToken';
import { analysisScreenStyles } from '@/styles/analysisScreenStyles';
import AntDesign from '@expo/vector-icons/AntDesign';

function AnalysisScreen() {
  const token = useToken();
  const today = new Date();
  const [todayDate, setTodayDate] = useState({
    year: String(today.getFullYear()),
    month: String(today.getMonth() + 1),
    day: String(today.getDate()),
  });

  const { data: weeklyAnalysis, isLoading, error } = useGetWeeklyAnalysis({ token: token!, date: todayDate });

  const degreeImageMap: Record<string, any> = {
    GOOD: require('../../assets/images/good.png'),
    BAD: require('../../assets/images/bad.png'),
    COMFORT: require('../../assets/images/comfort.png'),
    HARD: require('../../assets/images/hard.png'),
    UNKNOWN: require('../../assets/images/unknown.png'),
  };

  const handlePressLeft = () => {
    const currentDate = new Date(`${todayDate.year}-${todayDate.month}-${todayDate.day}`);
    currentDate.setDate(currentDate.getDate() - 7);
    setTodayDate({
      year: String(currentDate.getFullYear()),
      month: String(currentDate.getMonth() + 1),
      day: String(currentDate.getDate()),
    });
  };

  const handlePressRight = () => {
    const currentDate = new Date(`${todayDate.year}-${todayDate.month}-${todayDate.day}`);
    currentDate.setDate(currentDate.getDate() + 7);
    setTodayDate({
      year: String(currentDate.getFullYear()),
      month: String(currentDate.getMonth() + 1),
      day: String(currentDate.getDate()),
    });
  };

  return (
    <ScrollView
      style={analysisScreenStyles.Screen}
      contentContainerStyle={analysisScreenStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={analysisScreenStyles.dateContainer}>
        <Pressable
          onPress={() => handlePressLeft()}
          style={analysisScreenStyles.dataButton}
        >
          <AntDesign name="caretleft" size={24} color="#191D42" />
        </Pressable>
        <Text style={analysisScreenStyles.contentDate}>분석 기간: {weeklyAnalysis?.startDate} ~ {weeklyAnalysis?.endDate}</Text>
        <Pressable
          onPress={() => handlePressRight()}
          style={analysisScreenStyles.dataButton}
        >
          <AntDesign name="caretright" size={24} color="#191D42" />
        </Pressable>
      </View>
      <View style={analysisScreenStyles.headerContainer}>
      {weeklyAnalysis?.degree? (
        <Image
          source={degreeImageMap[weeklyAnalysis.degree]}
          style={{ width: 150, height: 150 }}
        />
      ) : (
        <Image
          source={degreeImageMap['UNKNOWN']}
          style={{ width: 150, height: 150 }}
        />
      )}
      {weeklyAnalysis?.title ? (
        <Text style={analysisScreenStyles.headerText}>{weeklyAnalysis?.title}</Text>
      ): 
        <Text style={analysisScreenStyles.headerText}>이번 주 일기가 없습니다!</Text>
      }
      </View>
      <View style={analysisScreenStyles.contentContainer}>
        {weeklyAnalysis?.title ? (
          <Text style={analysisScreenStyles.contentFeedback}>분석 내용: {weeklyAnalysis?.feedback}</Text>
        ) : (
          <Text style={analysisScreenStyles.contentFeedback}>오늘의 하루를 기록해보아요</Text>
        )}
      </View>
    </ScrollView>
  );
}

export default AnalysisScreen;
