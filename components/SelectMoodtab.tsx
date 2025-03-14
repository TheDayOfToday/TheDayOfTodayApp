import React, { useCallback, useRef, useMemo, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { moodSlidingTabStyles } from '@/styles/moodSlidingTabStyles';

function SelectModeTab() {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%", "10%", "100%"], []);
  const currentRoute = useNavigationState(state => state.routes[state.index]?.name)

  // 제출 버튼 클릭 시 탭 닫힘
  const handleSubmitPress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // 무드미터 선택 시 핸들러 함수
  const onPressMood = () => {
  }

  // 다른 탭으로 이동 시 슬라이딩 탭 닫힘
  useEffect(() => {
    if (currentRoute !== 'record') {
      sheetRef.current?.close();
    }
  }, [currentRoute]);

  return (
    <GestureHandlerRootView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false} // snapPoints로 시트 크기 고정
        style={moodSlidingTabStyles.sheet}
      >
        <BottomSheetScrollView style={moodSlidingTabStyles.sheetView}>
          <View>
            <Text>무드미터 선택</Text>
          </View>
          <View>
            {/* map으로 불러오기..? */}
            <Pressable
              onPress={onPressMood}
            >
              <Text>무드미터</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={handleSubmitPress}
            >
              <Text>완료</Text>
            </Pressable>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default SelectModeTab;
