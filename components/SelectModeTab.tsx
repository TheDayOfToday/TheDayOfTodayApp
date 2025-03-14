import React, { useCallback, useRef, useMemo, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useFocusEffect, useRoute, RouteProp, useNavigationState } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { modeSlidingTabStyles } from '@/styles/modeSlidingTabStyles';
import { useNavigation } from 'expo-router';

type SelectModeTabRouteProp = RouteProp<
  { record: { openBottomSheet?: boolean } },
  'record'
>;

type SelectModeTabProps = {
  setMode: (mode: string) => void;
};

function SelectModeTab({ setMode }: SelectModeTabProps) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["35%", "10%", "100%"], []);
  const route = useRoute<SelectModeTabRouteProp>();
  const navigation = useNavigation();
  const currentRoute = useNavigationState(state => state.routes[state.index]?.name)

  // 기록 화면에 있을 때 슬라이딩 탭 오픈
  useFocusEffect(
    useCallback(() => {
      if (route.params?.openBottomSheet) {
        sheetRef.current?.snapToIndex(0);
      }
    }, [route.params?.openBottomSheet])
  );

  // 슬라이딩 탭 위치 조정 핸들러함수
  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  // 취소 버튼 클릭 시 홈 화면 이동
  const handleClosePress = useCallback(() => {
    setMode('');
    sheetRef.current?.close();
    navigation.goBack();
  }, [navigation]);

  // 독백 버튼 클릭 시 핸들러 함수
  const onPressMonologue = () => {
    setMode('MonologueMode');
    sheetRef.current?.close();
  }

  // 대화 버튼 클릭 시 핸들러 함수
  const onPressConversation = () => {
    setMode('ConversationMode');
    sheetRef.current?.close();
  }

  // 다른 탭으로 이동 시 슬라이딩 탭 닫힘
  useEffect(() => {
    if (currentRoute !== 'record') {
      sheetRef.current?.close();
      setMode('');
    }
  }, [currentRoute]);

  return (
    <GestureHandlerRootView>
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
          <View style={modeSlidingTabStyles.cancleButtonContainer}>
            <Pressable style={modeSlidingTabStyles.cancleButton} onPress={() => handleClosePress()}>
              <Text style={modeSlidingTabStyles.cancleButtonText}>취소</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default SelectModeTab;
