import React, { useCallback, useRef, useMemo} from 'react';
import { View, Text, Pressable } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { moodSlidingTabStyles } from '@/styles/moodSlidingTabStyles';

function SelectMoodTab() {
  const moodSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["13%", "80%"], []);
  const router = useRouter();

  // 완료 버튼 클릭 시 탭 닫힘
  const handleSubmitPress = useCallback(() => {
    moodSheetRef.current?.close();
    router.push('/recording/result');
  }, []);

  // 무드미터 선택 시 핸들러 함수
  const onPressMood = useCallback(() => {
  }, []);

  return (
    <BottomSheet
      ref={moodSheetRef}
      index={1}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
    >
      <BottomSheetScrollView style={moodSlidingTabStyles.sheetView}>
        <View>
          <Text style={moodSlidingTabStyles.headerTitle}>무드미터 선택</Text>
        </View>
        <View style={moodSlidingTabStyles.content}>
          {/* map으로 불러오기..? */}
          <Pressable
            onPress={onPressMood}
          >
            <Text>무드미터들</Text>
          </Pressable>
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
