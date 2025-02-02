import React, { useCallback, useRef, useMemo, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useFocusEffect, useRoute, RouteProp } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { recordScreenStyles } from '../../styles/recordScreenStyles';
import { slidingTabStyles } from '@/styles/slidingTabStyles';
import { useNavigation } from 'expo-router';

type RecordScreenRouteProp = RouteProp<
  { record: { openBottomSheet?: boolean } },
  'record'
>;

const RecordScreen = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%", "100%"], []);
  const route = useRoute<RecordScreenRouteProp>();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      if (route.params?.openBottomSheet) {
        sheetRef.current?.snapToIndex(0); // "40%" 위치로 자동으로 오픈
      }
    }, [route.params?.openBottomSheet])
  );

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    navigation.goBack();
  }, [navigation]);
  
  return (
    <View style={recordScreenStyles.container}>
      <GestureHandlerRootView>
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          enableContentPanningGesture={false}
          enableHandlePanningGesture={false} 
          style={slidingTabStyles.sheet}
        >
          <BottomSheetView style={slidingTabStyles.sheetView}>
            <View style={slidingTabStyles.sheetHeaderContainer}>
              <Text style={slidingTabStyles.sheetHeaderTitle}>일기 작성 모드를 선택해주세요</Text>
            </View>
            <View style={slidingTabStyles.recordButtonContainer}>
              <Pressable style={slidingTabStyles.recordButton} onPress={() => handleSnapPress(1)}>
                <Text style={slidingTabStyles.recordButtonText}>독백</Text>
              </Pressable>
              <Pressable style={slidingTabStyles.recordButton} onPress={() => handleSnapPress(1)}>
                <Text style={slidingTabStyles.recordButtonText}>대화</Text>
              </Pressable>
            </View>
            <View style={slidingTabStyles.cancleButtonContainer}>
              <Pressable style={slidingTabStyles.cancleButton} onPress={() => handleClosePress()}>
                <Text style={slidingTabStyles.cancleButtonText}>취소</Text>
              </Pressable>
            </View>
          </BottomSheetView>
        </BottomSheet>
        <View style={recordScreenStyles.messageContainer}>
          {/* <Text style={recordScreenStyles.message}>당신의 하루를 들려주세요</Text> */}
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

export default RecordScreen;
