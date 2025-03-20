import React, {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Modal, TouchableOpacity, Pressable } from 'react-native';
import {Calendar} from 'react-native-calendars';
import { calendarModalStyles } from '@/styles/calendarModalStyles';
import { styles } from '../../styles/calendarScreenStyles';

const BACKCOLOR = '#F3F2ED';

function CalendarScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [selectedTab, setSelectedTab] = useState<'diary' | 'analysis'>('diary'); // 현재 선택된 탭 상태

  // 날짜를 클릭할 때 실행되는 함수
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);

    // 선택한 날짜의 스타일을 업데이트
    setMarkedDates({
      [day.dateString]: {
        selected: true,
        selectedTextColor: 'skyblue', // 선택된 날짜의 텍스트 색상을 하늘색으로 설정
        marked: true,
      },
    });

    setModalVisible(true);
  };


  // 캘린더의 날짜 위에 위치할 동그라미 아이콘을 랜더링하는 컴포넌트
  const CustomDay = ({ date, state, marking, onPress } : any) => {
    const isSelected = marking?.selected;
    
    return (
      <View style={styles.dayContainer}>
        <Text style={[
          styles.dayText,
          state === 'disabled' && styles.disabledText,
          isSelected && styles.selectedDayText,
          isSelected && { color: marking?.selectedTextColor },
        ]}>
          {date.day}
        </Text>
        <Pressable
          onPress={() => handleDayPress(date)}
          style={styles.circleIcon}
        >
          <View style={[
            styles.circle,
            marking?.marked && styles.markedCircle
          ]} />
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          current={'2025-01-01'}
          // 날짜를 눌렀을 때 처리하는 콜백 함수
          onDayPress={handleDayPress}
          monthFormat={'MMM yyyy'}
          // 월 페이지에 다른 달의 날짜를 보여주지 않음(true) 또는 보여줌(false)
          hideExtraDays={false}
          // firstDay=1이면 주는 월요일부터 시작.
          firstDay={0}
          dayComponent={CustomDay}

          markingType={'custom'}
          markedDates={markedDates}

          theme={{            
            textSectionTitleColor: '#999999',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            arrowColor: '#999999',
            monthTextColor: '#2d4150',
            textMonthFontWeight: '600',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 13,            
          }}          
        />

        {/* 날짜 클릭 시 생성되는 모달 폼 구현 코드 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedDate}</Text>
              
              {/* 📌 탭 UI */}
              <View style={calendarModalStyles.tabContainer}>
                <TouchableOpacity
                  style={[calendarModalStyles.tabButton, selectedTab === 'diary' && calendarModalStyles.selectedTab]}
                  onPress={() => setSelectedTab('diary')}
                >
                  <Text style={[calendarModalStyles.tabText, selectedTab === 'diary' && calendarModalStyles.selectedTabText]}>
                    이 날의 일기
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[calendarModalStyles.tabButton, selectedTab === 'analysis' && calendarModalStyles.selectedTab]}
                  onPress={() => setSelectedTab('analysis')}
                >
                  <Text style={[calendarModalStyles.tabText, selectedTab === 'analysis' && calendarModalStyles.selectedTabText]}>
                    AI 분석
                  </Text>
                </TouchableOpacity>
              </View>            

              {/* 📌 탭 내용 */}
              {selectedTab === 'diary' ? (
                <View style={calendarModalStyles.tabContent}>
                  <Text style={calendarModalStyles.diaryTitle}>술 좀 그만 먹자</Text>
                  <Text style={calendarModalStyles.diaryText}>
                    어제 술을 왕창 마시고 잠들어서 그런지 눈을 떠보니 수업 10분 전이었다. 
                    부랴부랴 짐을 챙기고 신발을 신고 뛰쳐나갔다.
                  </Text>
                </View>
              ) : (
                <View style={calendarModalStyles.tabContent}>
                  <Text style={calendarModalStyles.analysisText}>
                    전날 과음을 하여 숙취의 여파가 컸던 하루였습니다. 
                    더군다나 휴강과 비 소식 등 기운 빠지게 하는 일들의 영향을 받아 
                    전반적으로 기분이 가라앉은 날이었습니다.
                  </Text>
                </View>
              )}

              <TouchableOpacity style={calendarModalStyles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={calendarModalStyles.modalButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
