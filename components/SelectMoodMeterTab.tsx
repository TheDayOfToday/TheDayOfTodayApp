import React, { useRef, useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import useToken from '@/hooks/useToken';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import usePostMoodMeters from '@/hooks/usePostMoodMeters';
import useGetMoodMeters from '@/hooks/useGetMoodMeters';
import useShowToast from '@/hooks/useShowToast';
import { moodSlidingTabStyles } from '@/styles/moodSlidingTabStyles';

interface SelectMoodTabProps {
  diaryId: number;
}

function SelectMoodTab({ diaryId }: SelectMoodTabProps) {
  const token = useToken();
  const showToast = useShowToast();
  const moodSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["13%", "80%"], []);
  const router = useRouter();

  const { data, loading, error } = diaryId ? useGetMoodMeters(diaryId) : { data: undefined, loading: true, error: undefined };
  const diaryMood = data?.diaryMood;
  const moodCategories = data?.moodCategories ?? [];
  const [selectedMood, setSelectedMood] = useState<{ moodName: string; color: string } | null>(null);

  useEffect(() => {
    if (diaryMood) {
      setSelectedMood({
        moodName: diaryMood.moodName,
        color: diaryMood.moodColor,
      });
    }
  }, [diaryMood]);

  const { mutate: moodMeterMutate } = usePostMoodMeters();
  
  if (error) {
    showToast('error', '로딩 실패', '무드미터를 불러오는 데에 실패했습니다.');
    return null;
  };

  // 무드미터 선택 시 핸들러 함수
  const onPressMood = (mood: { moodName: string; color: string }) => {
    setSelectedMood(mood);
  };

  // 완료 버튼 클릭 시 탭을 닫음
  const handleSubmitPress = async () => {
    if (!selectedMood) {
      showToast('error', '선택 없음', '무드를 선택해주세요.');
      return;
    }

    try {
      await moodMeterMutate({
        token: token!,
        diaryId,
        moodMeter: {
          moodName: selectedMood.moodName,
          moodColor: selectedMood.color,
        },
      });
      moodSheetRef.current?.close();
      router.push({
        pathname: '/recording/result',
        params: { diaryId: diaryId.toString() },
      });
    } catch (e) {
      showToast('error', '무드미터 저장 실패', '무드미터 저장에 실패하였습니다.');
    }
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
        <View style={moodSlidingTabStyles.headerContainer}>
          <Text style={moodSlidingTabStyles.headerTitle}>무드미터 선택</Text>
            <Pressable
              onPress={handleSubmitPress}
              style={moodSlidingTabStyles.submitButton}
            >
              <Text style={moodSlidingTabStyles.submitButtonText}>완료</Text>
            </Pressable>
        </View>
        {loading && <Text>로딩 중...</Text>}
        <View style={moodSlidingTabStyles.content}>
          <View style={moodSlidingTabStyles.suggestedMoodContainer}>
            <Text style={moodSlidingTabStyles.suggestionLabelText}>오늘의 당신은</Text>
              <View
                style={[
                  moodSlidingTabStyles.suggestedMood,
                  { borderBottomColor: selectedMood?.color},
                ]}
              >
                <Entypo name="drop" size={16} color={selectedMood?.color} />
                <Text style={moodSlidingTabStyles.suggestedMoodText}> {selectedMood?.moodName}</Text>
              </View>
            <Text style={moodSlidingTabStyles.suggestionLabelText}>하루 입니다.</Text>
          </View>
          {moodCategories.map((item) => (
            <View key={item.degree} style={moodSlidingTabStyles.moodContainer}>
              <Text style={moodSlidingTabStyles.moodDegreeText}>{item.degree}</Text>
              <View style={moodSlidingTabStyles.moodButtonContainer}>
                {item.moods.map((mood) => (
                  <Pressable
                    key={`${item.degree}-${mood.moodName}`}
                    onPress={() => onPressMood(mood)}
                    style={() => [
                      moodSlidingTabStyles.moodButton,
                      selectedMood === mood && moodSlidingTabStyles.selectedMoodButton,
                      selectedMood?.moodName === mood.moodName && moodSlidingTabStyles.selectedMoodButton,
                      { borderColor: mood.color },
                    ]}
                  >
                    <Entypo name="drop" size={16} color={mood.color} />
                    <Text style={moodSlidingTabStyles.moodButtonText}> {mood.moodName}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default SelectMoodTab;
