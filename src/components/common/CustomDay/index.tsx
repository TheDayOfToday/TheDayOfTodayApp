import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { styles } from '@/src/styles/calendarScreenStyles';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  date: any;
  state: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  marking: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDayPress: (day: any) => void;
}

export const CustomDay = ({ date, state, marking, onDayPress }: Props) => {
  const today = new Date();
  const isToday =
    Number(date.year) === today.getFullYear() &&
    Number(date.month) === today.getMonth() + 1 &&
    Number(date.day) === today.getDate();

  const dayTextStyle = [
    styles.dayText,
    state === 'disabled' && styles.disabledText,
    isToday && styles.todayText,
  ];

  return (
    <Pressable onPress={() => onDayPress(date)} style={styles.dayContainer}>
      <Text style={dayTextStyle}>{date.day}</Text>
      <View
        style={[
          styles.circle,
          marking?.dotColor ? { backgroundColor: marking.dotColor } : styles.circleDefault,
        ]}
      />
    </Pressable>
  );
};
