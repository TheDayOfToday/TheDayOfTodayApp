import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { ScrollView, View, Text, Pressable, Image } from 'react-native';

import { useWeeklyDateNavigation } from '@/src/hooks/useWeeklyDateNavigation';
import { analysisScreenStyles } from '@/src/styles/analysisScreenStyles';

function AnalysisScreen() {
  const {
    weeklyAnalysis,
    isFutureDate,
    degreeImage,
    handlePressLeft,
    handlePressRight,
  } = useWeeklyDateNavigation();

  return (
    <ScrollView
      style={analysisScreenStyles.Screen}
      contentContainerStyle={analysisScreenStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={analysisScreenStyles.dateContainer}>
        <Pressable
          onPress={handlePressLeft}
          style={analysisScreenStyles.dataButton}
        >
          <AntDesign name="caretleft" size={24} color="#D6DEFD" />
        </Pressable>
          <Text style={analysisScreenStyles.contentDate}>{weeklyAnalysis?.startDate}~{weeklyAnalysis?.endDate}</Text>
        <Pressable
          onPress={handlePressRight}
          style={analysisScreenStyles.dataButton}
        >
          <AntDesign name="caretright" size={24} color="#D6DEFD" />
        </Pressable>
      </View>
      <View style={analysisScreenStyles.headerContainer}>
        <Image
          source={degreeImage}
          style={analysisScreenStyles.degreeImage}
        />
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
