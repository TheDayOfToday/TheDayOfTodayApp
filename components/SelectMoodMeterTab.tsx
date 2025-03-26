import React, { useCallback, useRef, useMemo, useState} from 'react';
import { View, Text, Pressable } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
// import { useMoodMeters } from '@/hooks/useMoodMeters';
import { moodSlidingTabStyles } from '@/styles/moodSlidingTabStyles';

function SelectMoodTab() {
  const moodSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["13%", "80%"], []);
  const router = useRouter();

  const [selectedMood, setSelectedMood] = useState(false);

  // const { data, loading, error } = useMoodMeters();

  // if (loading) return <div>로딩 중...</div>;
  // if (error) return <div>에러 발생: {error.message}</div>;

  // 완료 버튼 클릭 시 탭 닫힘
  const handleSubmitPress = useCallback(() => {
    moodSheetRef.current?.close();
    router.push('/recording/result');
  }, []);

  // 무드미터 선택 시 핸들러 함수
  const onPressMood = useCallback(() => {
    setSelectedMood(prev => !prev);
  }, [selectedMood]);

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
        <View style={moodSlidingTabStyles.content}>
          {/* {data?.map((item) => (
            <View key={item.degree}>
              <Text>{item.degree}</Text>
              {item.moods.map((mood) => (
                <Pressable
                  onPress={onPressMood}
                >
                  <View key={mood.moodName} style={{ borderColor: mood.color }}>
                    <Text>{mood.moodName}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          ))} */}
          <View style={moodSlidingTabStyles.moodContainer}>
            <Text style={moodSlidingTabStyles.moodDegreeText}>긍정</Text>
            <View style={moodSlidingTabStyles.moodButtonContainer}>
              <Pressable
                onPress={onPressMood}
                // style={moodSlidingTabStyles.moodButton}
                style={() => [
                  moodSlidingTabStyles.moodButton,
                  selectedMood && moodSlidingTabStyles.selectedMoodButton,
                  { borderColor: '#FFD700' },
                ]}
              >
                <Entypo name="drop" size={16} color="#FFD700" />
                <Text style={moodSlidingTabStyles.moodButtonText}>신나는</Text>
              </Pressable>
              <Pressable
                onPress={onPressMood}
                // style={moodSlidingTabStyles.moodButton}
                style={() => [
                  moodSlidingTabStyles.moodButton,
                  { borderColor: '#f5b938' },
                ]}
              >
                <Entypo name="drop" size={16} color="#f5b938" />
                <Text style={moodSlidingTabStyles.moodButtonText}>상쾌한</Text>
              </Pressable>
              <Pressable
                onPress={onPressMood}
                style={() => [
                  moodSlidingTabStyles.moodButton,
                  { borderColor: '#1b9e1d' },
                ]}
              >
                <Entypo name="drop" size={16} color="#1b9e1d" />
                <Text style={moodSlidingTabStyles.moodButtonText}>행복한</Text>
              </Pressable>
              <Pressable
                onPress={onPressMood}
                style={() => [
                  moodSlidingTabStyles.moodButton,
                  { borderColor: '#78f556' },
                ]}
              >
                <Entypo name="drop" size={16} color="#78f556" />
                <Text style={moodSlidingTabStyles.moodButtonText}>기쁜</Text>
              </Pressable>
              <Pressable
                onPress={onPressMood}
                style={() => [
                  moodSlidingTabStyles.moodButton,
                  { borderColor: '#528a42' },
                ]}
              >
                <Entypo name="drop" size={16} color="#528a42" />
                <Text style={moodSlidingTabStyles.moodButtonText}>평온한</Text>
              </Pressable>
              <Pressable
                onPress={onPressMood}
                style={() => [
                  moodSlidingTabStyles.moodButton,
                  { borderColor: '#15e684' },
                ]}
              >
                <Entypo name="drop" size={16} color="#15e684" />
                <Text style={moodSlidingTabStyles.moodButtonText}>기대되는</Text>
              </Pressable>
            </View>
          </View>
          <View style={moodSlidingTabStyles.moodContainer}>
            <Text style={moodSlidingTabStyles.moodDegreeText}>부정</Text>
            <View style={moodSlidingTabStyles.moodButtonContainer}>
              <Pressable
                  onPress={onPressMood}
                  // style={moodSlidingTabStyles.moodButton}
                  style={() => [
                    moodSlidingTabStyles.moodButton,
                    { borderColor: '#d52323' },
                  ]}
                >
                  <Entypo name="drop" size={16} color="#d52323" />
                  <Text style={moodSlidingTabStyles.moodButtonText}>화나는</Text>
                </Pressable>
                <Pressable
                  onPress={onPressMood}
                  // style={moodSlidingTabStyles.moodButton}
                  style={() => [
                    moodSlidingTabStyles.moodButton,
                    { borderColor: '#f56e38' },
                  ]}
                >
                  <Entypo name="drop" size={16} color="#f56e38" />
                  <Text style={moodSlidingTabStyles.moodButtonText}>두려운</Text>
                </Pressable>
                <Pressable
                  onPress={onPressMood}
                  style={() => [
                    moodSlidingTabStyles.moodButton,
                    { borderColor: '#9e1b1b' },
                  ]}
                >
                  <Entypo name="drop" size={16} color="#9e1b1b" />
                  <Text style={moodSlidingTabStyles.moodButtonText}>짜증나는</Text>
                </Pressable>
                <Pressable
                  onPress={onPressMood}
                  style={() => [
                    moodSlidingTabStyles.moodButton,
                    { borderColor: '#8a13a4' },
                  ]}
                >
                  <Entypo name="drop" size={16} color="#8a13a4" />
                  <Text style={moodSlidingTabStyles.moodButtonText}>긴장되는</Text>
                </Pressable>
                <Pressable
                  onPress={onPressMood}
                  style={() => [
                    moodSlidingTabStyles.moodButton,
                    { borderColor: '#802155' },
                  ]}
                >
                  <Entypo name="drop" size={16} color="#802155" />
                  <Text style={moodSlidingTabStyles.moodButtonText}>불안한</Text>
                </Pressable>
                <Pressable
                  onPress={onPressMood}
                  style={() => [
                    moodSlidingTabStyles.moodButton,
                    { borderColor: '#7315e6' },
                  ]}
                >
                  <Entypo name="drop" size={16} color="#7315e6" />
                  <Text style={moodSlidingTabStyles.moodButtonText}>답답한</Text>
                </Pressable>
            </View>
          </View>
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
