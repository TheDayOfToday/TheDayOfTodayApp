import React, { useCallback, useRef, useMemo, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useFocusEffect, useRoute, RouteProp, useNavigationState } from '@react-navigation/native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { modeSlidingTabStyles } from '@/styles/modeSlidingTabStyles';
import { useNavigation } from 'expo-router';

type SelectModeTabRouteProp = RouteProp<
  { recording: { openBottomSheet?: boolean } },
  'recording'
>;

interface SelectModeTabProps {
  selectMode: (mode: string) => void;
};

function SelectModeTab({ selectMode }: SelectModeTabProps) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%", "100%"], []);
  const route = useRoute<SelectModeTabRouteProp>();
  const currentRoute = useNavigationState(state => state.routes[state.index]?.name)

  // 기록 화면에 있을 때 슬라이딩 탭 오픈
  useFocusEffect(
    useCallback(() => {
      if (route.params?.openBottomSheet) {
        sheetRef.current?.snapToIndex(0);
      }
    }, [route.params?.openBottomSheet])
  );

  // 독백 버튼 클릭 시 핸들러 함수
  const onPressMonologue = useCallback(() => {
    selectMode('MonologueMode');
    sheetRef.current?.close();
  }, [selectMode]);

  // 대화 버튼 클릭 시 핸들러 함수

  const onPressConversation = useCallback(() => {
    selectMode('ConversationMode');
    sheetRef.current?.close();
  }, [selectMode]);

  // 다른 탭으로 이동 시 슬라이딩 탭 닫힘
  useEffect(() => {
    if (currentRoute !== 'recording') {
      sheetRef.current?.close();
      selectMode('');
    }
  }, [currentRoute]);

  return (
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false} // snapPoints로 시트 크기 고정
        style={modeSlidingTabStyles.sheet}
      >
        <BottomSheetView style={modeSlidingTabStyles.sheetView}>
          <View style={modeSlidingTabStyles.sheetHeaderContainer}>
            <Text style={modeSlidingTabStyles.sheetHeaderTitle}>일기 작성 모드를 선택해주세요</Text>
          </View>
          <View style={modeSlidingTabStyles.recordButtonContainer}>
            <Pressable style={modeSlidingTabStyles.recordButton} onPress={() => onPressMonologue()}>
              <Text style={modeSlidingTabStyles.recordButtonText}>독백</Text>
            </Pressable>
            <Pressable style={modeSlidingTabStyles.recordButton} onPress={() => onPressConversation()}>
              <Text style={modeSlidingTabStyles.recordButtonText}>대화</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
  );
};

export default SelectModeTab;
