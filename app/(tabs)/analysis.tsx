import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { analysisScreenStyles } from '@/styles/analysisScreenStyles';

function AnalysisScreen() {
  return (
    <ScrollView 
      style={{flex: 1}}
      contentContainerStyle={analysisScreenStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={analysisScreenStyles.headerContainer}>
        <FontAwesome name="circle-thin" size={200} color="black" />
        <Text style={analysisScreenStyles.headerText}>일주일 한 줄 요약</Text>
      </View>
      <View style={analysisScreenStyles.contentContainer}>
        <Text style={analysisScreenStyles.contentText}>
          분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용
          분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용
          분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용
          분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용
          분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용
          분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용
          분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용
          분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용분석내용
        </Text>
      </View>
    </ScrollView>
  );
};

export default AnalysisScreen;
