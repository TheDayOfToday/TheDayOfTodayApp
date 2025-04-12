import React, { useRef, useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import useMoodMeters from '@/hooks/useMoodMeters';
import useShowToast from '@/hooks/useShowToast';
import { moodSlidingTabStyles } from '@/styles/moodSlidingTabStyles';

interface SelectMoodTabProps {
  diaryId: number;
}

function SelectMoodTab({ diaryId }: SelectMoodTabProps) {
  const showToast = useShowToast();
  const moodSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["13%", "80%"], []);
  const router = useRouter();

  const { moodCategories, diaryMood, loading, error } = useMoodMeters();
  const [selectedMoodName, setSelectedMoodName] = useState<string | null>(null);
  
  if (error) {
    showToast('error', '로딩 실패', '무드미터를 불러오는 데에 실패했습니다.');
    return null;
  };

  // 완료 버튼 클릭 시 탭 닫힘
  const handleSubmitPress = () => {
    moodSheetRef.current?.close();
    router.push('/recording/result');
  };

  // 무드미터 선택 시 핸들러 함수
  const onPressMood = (moodName: string) => {
    setSelectedMoodName(moodName);
  };

  return (
    <BottomSheet
      ref={moodSheetRef}
      index={1}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      backgroundStyle={moodSlidingTabStyles.backgroundSheet}
    >
      <BottomSheetScrollView style={moodSlidingTabStyles.sheetView}>
        <View>
          <Text style={moodSlidingTabStyles.headerTitle}>무드미터 선택</Text>
        </View>
        {loading && <Text>로딩 중...</Text>}
        <View style={moodSlidingTabStyles.content}>
          {moodCategories.map((item) => (
            <View key={item.degree} style={moodSlidingTabStyles.moodContainer}>
              <Text style={moodSlidingTabStyles.moodDegreeText}>{item.degree}</Text>
              <View style={moodSlidingTabStyles.moodButtonContainer}>
                {item.moods.map((mood) => (
                  <Pressable
                    key={`${item.degree}-${mood.moodName}`}
                    onPress={() => onPressMood(mood.moodName)}
                    style={() => [
                      moodSlidingTabStyles.moodButton,
                      selectedMoodName === mood.moodName && moodSlidingTabStyles.selectedMoodButton,
                      { borderColor: mood.color },
                    ]}
                  >
                    <Entypo name="drop" size={16} color={mood.color} />
                    <Text style={moodSlidingTabStyles.moodButtonText}>{mood.moodName}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </View>
        <View style={moodSlidingTabStyles.submitButtonContainer}>
          <Pressable
            onPress={handleSubmitPress}
            style={moodSlidingTabStyles.submitButton}
          >
            <Text style={moodSlidingTabStyles.submitButtonText}>완료</Text>
          </Pressable>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default SelectMoodTab;
