import React, {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Modal, TouchableOpacity, Pressable } from 'react-native';
import {Calendar} from 'react-native-calendars';
import { styles } from '../../styles/calendarScreenStyles';
import { AnimateToPositionType } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/types';

const BACKCOLOR = '#F3F2ED';

const CalendarScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  // 캘린더의 날짜 위에 위치할 동그라미 아이콘을 랜더링하는 컴포넌트
  const CustomDay = ({ date, state, marking, onPress } : any) => {
    const isSelected = marking?.selected;
    
    return (
      <View style={styles.dayContainer}>
        <Text style={[
          styles.dayText,
          state === 'disabled' && styles.disabledText,
          isSelected && styles.selectedDayText
        ]}>
          {date.day}
        </Text>
        <Pressable
          onPress={() => {
            setSelectedDate(date.dateString);
            setModalVisible(true);
          }}
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
          onDayPress={(day: any) => {
            console.log('Selected day', day);
          }}
          monthFormat={'MMM yyyy'}
          // 월 페이지에 다른 달의 날짜를 보여주지 않음(true) 또는 보여줌(false)
          hideExtraDays={false}
          // firstDay=1이면 주는 월요일부터 시작.
          firstDay={0}
          dayComponent={CustomDay}


          theme={{            
            // backgroundColor: BACKCOLOR,
            // calendarBackground: BACKCOLOR,
            textSectionTitleColor: '#999999',
            selectedDayBackgroundColor: '#63B75D',
            // selectedDayTextColor: BACKCOLOR,
            todayTextColor: '#63B75D',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            arrowColor: '#999999',
            monthTextColor: '#2d4150',
            textMonthFontWeight: '600',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 13,            
          }}
          markingType={'custom'}
          markedDates={{
            '2025-01-15': {
              marked: true,
              selected: true
            }
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
              <Text style={styles.modalTitle}>Record your day!</Text>
              <Text style={styles.modalDate}>{selectedDate}</Text>
              
              {/* 여기에 폼 컴포넌트 추가 예정 */}
              
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
