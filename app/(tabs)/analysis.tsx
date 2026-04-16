import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable, Image } from 'react-native';

import type { ImageSourcePropType } from 'react-native';

import useDoubleBackExit from '@/src/hooks/useDoubleBackExit';
import { useToken } from '@/src/hooks/useToken';
import { useGetWeeklyAnalysis } from '@/src/queries/useWeeklyQuery';
import { analysisScreenStyles } from '@/src/styles/analysisScreenStyles';

function AnalysisScreen() {
  const token = useToken();
  const today = new Date();
  today.setDate(today.getDate() - 7);
  const [todayDate, setTodayDate] = useState({
    year: String(today.getFullYear()),
    month: String(today.getMonth() + 1),
    day: String(today.getDate()),
  });

  const { data: weeklyAnalysis } = useGetWeeklyAnalysis({ token: token!, date: todayDate });

  /* eslint-disable @typescript-eslint/no-require-imports */
  const degreeImageMap: Record<string, ImageSourcePropType> = {
    GOOD: require('../../assets/images/goodv2.png'),
    BAD: require('../../assets/images/badv2.png'),
    COMFORT: require('../../assets/images/comfortv2.png'),
    HARD: require('../../assets/images/hardv2.png'),
    UNKNOWN: require('../../assets/images/unknownv2.png'),
  };
  /* eslint-enable @typescript-eslint/no-require-imports */

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

  const todayObj = new Date();
  const isFutureDate = weeklyAnalysis?.endDate ? new Date(weeklyAnalysis.endDate) > todayObj : false;

  useDoubleBackExit(true);

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
          <AntDesign name="caretleft" size={24} color="#D6DEFD" />
        </Pressable>
          <Text style={analysisScreenStyles.contentDate}>{weeklyAnalysis?.startDate}~{weeklyAnalysis?.endDate}</Text>
        <Pressable
          onPress={() => handlePressRight()}
          style={analysisScreenStyles.dataButton}
        >
          <AntDesign name="caretright" size={24} color="#D6DEFD" />
        </Pressable>
      </View>
      <View style={analysisScreenStyles.headerContainer}>
      {weeklyAnalysis?.degree? (
        <Image
          source={degreeImageMap[weeklyAnalysis.degree]}
          style={analysisScreenStyles.degreeImage}
        />
      ) : (
        <Image
          source={degreeImageMap['UNKNOWN']}
          style={analysisScreenStyles.degreeImage}
        />
      )}
      {weeklyAnalysis?.title ? (
        <Text style={analysisScreenStyles.headerText}>{weeklyAnalysis?.title}</Text>
      ) : (
        <Text style={analysisScreenStyles.headerText}>
          {isFutureDate ? '아직 분석할 수 없습니다!' : '분석할 일기가 없습니다!'}
        </Text>
      )}
      </View>
      <View style={analysisScreenStyles.contentContainer}>
        {weeklyAnalysis?.title ? (
          <Text style={analysisScreenStyles.contentFeedback}>{weeklyAnalysis?.feedback}</Text>
        ) : (
          <Text style={analysisScreenStyles.contentFeedback}>오늘의 하루를 기록해보아요</Text>
        )}
      </View>
    </ScrollView>
  );
}

export default AnalysisScreen;
