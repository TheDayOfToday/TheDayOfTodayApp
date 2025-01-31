import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform,
  SafeAreaView, 
  Modal, 
  TouchableOpacity, 
  Pressable, 
  Button 
} from 'react-native';
import { commonStyles } from '../../styles/common';
import { calendarScreenStyles } from '../../styles/calendarScreenStyles';
import { calendarModalStyles } from '../../styles/calendarModalStyles';
import * as Calendar from 'expo-calendar';

const CalendarScreen = () => {
  // 캘린더 권한 요청
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>캘린더 화면</Text>
      {/* <Button title="Create a new calendar" onPress={createCalendar} /> */}
    </View>
  );
};

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar', type: Calendar.SourceType.LOCAL };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default CalendarScreen;
