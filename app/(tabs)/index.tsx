import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Modal, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { Book } from '@/src/components/common/Book';
import { CustomDay } from '@/src/components/common/CustomDay';
import { useCalendarScreen } from '@/src/hooks/useCalendarScreen';
import { calendarModalStyles } from '@/src/styles/calendarModalStyles';
import { styles } from '@/src/styles/calendarScreenStyles';

function CalendarScreen() {
  const {
    modalVisible,
    selectedTab,
    setSelectedTab,
    formattedDate,
    markedDates,
    diary,
    analysis,
    moveDate,
    handleDayPress,
    closeModal,
    handleDeleteDiary,
  } = useCalendarScreen();

  return (
    <ScrollView
      style={styles.safeArea}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          theme={{
            calendarBackground: '#17171C',
            monthTextColor: '#D6DEFD',
            textMonthFontSize: 18,
            textMonthFontFamily: 'Pretendard4',
            arrowColor: '#D6DEFD',
            textSectionTitleColor: '#D6DEFD',
          }}
          current={new Date().toISOString().split('T')[0]}
          onDayPress={handleDayPress}
          key={JSON.stringify(markedDates)}
          markingType="multi-dot"
          markedDates={markedDates}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dayComponent={({ date, state, marking }: any) => (
            <CustomDay
              date={date}
              state={state}
              marking={marking}
              onDayPress={handleDayPress}
            />
          )}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={calendarModalStyles.dateRow}>
                <TouchableOpacity onPress={() => moveDate('prev')}>
                  <Ionicons name="chevron-back" size={20} color="#96A0CC" style={calendarModalStyles.arrowIcon} />
                </TouchableOpacity>
                <Text style={calendarModalStyles.dateText}>{formattedDate}</Text>
                <TouchableOpacity onPress={() => moveDate('next')}>
                  <Ionicons name="chevron-forward" size={20} color="#96A0CC" style={calendarModalStyles.arrowIcon} />
                </TouchableOpacity>
              </View>
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

              {selectedTab === 'diary' ? (
                diary.isLoading ? (
                  <Text>일기 불러오는 중...</Text>
                ) : diary.data ? (
                  <ScrollView style={calendarModalStyles.tabContent}>
                    <Text style={calendarModalStyles.diaryTitle}>{diary.data.title}</Text>
                    <Text style={calendarModalStyles.diaryText}>{diary.data.content}</Text>
                  </ScrollView>
                ) : (
                  <View style={calendarModalStyles.tabNoContent}>
                    <Text style={calendarModalStyles.diaryText}>일기 없음</Text>
                  </View>
                )
              ) : (
                analysis.isLoading ? (
                  <Text>분석 불러오는 중...</Text>
                ) : analysis.data ? (
                  <ScrollView style={calendarModalStyles.tabContent}>
                    <Text style={calendarModalStyles.analysisText}>{analysis.data.analysis}</Text>
                  </ScrollView>
                ) : (
                  <View style={calendarModalStyles.tabNoContent}>
                    <Text style={calendarModalStyles.analysisText}>분석 없음</Text>
                  </View>
                )
              )}
              <View style={calendarModalStyles.modalButtonContainer}>
                <Pressable style={calendarModalStyles.deleteDiaryButton} onPress={handleDeleteDiary}>
                  <Text style={calendarModalStyles.deleteDiaryButtonText}>삭제</Text>
                </Pressable>
                <TouchableOpacity style={calendarModalStyles.modalButton} onPress={closeModal}>
                  <Text style={calendarModalStyles.modalButtonText}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Book />
      </View>
    </ScrollView>
  );
}

export default CalendarScreen;
