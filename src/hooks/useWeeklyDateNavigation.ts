import { useState } from 'react';

import type { ImageSourcePropType } from 'react-native';

import useDoubleBackExit from '@/src/hooks/useDoubleBackExit';
import { useToken } from '@/src/hooks/useToken';
import { useGetWeeklyAnalysis } from '@/src/queries/useWeeklyQuery';

/* eslint-disable @typescript-eslint/no-require-imports */
const degreeImageMap: Record<string, ImageSourcePropType> = {
  GOOD: require('../../assets/images/goodv2.png'),
  BAD: require('../../assets/images/badv2.png'),
  COMFORT: require('../../assets/images/comfortv2.png'),
  HARD: require('../../assets/images/hardv2.png'),
  UNKNOWN: require('../../assets/images/unknownv2.png'),
};
/* eslint-enable @typescript-eslint/no-require-imports */

export const useWeeklyDateNavigation = () => {
  const token = useToken();
  const today = new Date();
  today.setDate(today.getDate() - 7);
  const [todayDate, setTodayDate] = useState({
    year: String(today.getFullYear()),
    month: String(today.getMonth() + 1),
    day: String(today.getDate()),
  });

  const { data: weeklyAnalysis } = useGetWeeklyAnalysis({ token: token!, date: todayDate });

  const handlePressLeft = () => {
    const currentDate = new Date(`${todayDate.year}-${todayDate.month}-${todayDate.day}`);
    currentDate.setDate(currentDate.getDate() - 7);
    setTodayDate({
      year: String(currentDate.getFullYear()),
      month: String(currentDate.getMonth() + 1),
      day: String(currentDate.getDate()),
    });
  };

  const handlePressRight = () => {
    const currentDate = new Date(`${todayDate.year}-${todayDate.month}-${todayDate.day}`);
    currentDate.setDate(currentDate.getDate() + 7);
    setTodayDate({
      year: String(currentDate.getFullYear()),
      month: String(currentDate.getMonth() + 1),
      day: String(currentDate.getDate()),
    });
  };

  const todayObj = new Date();
  const isFutureDate = weeklyAnalysis?.endDate ? new Date(weeklyAnalysis.endDate) > todayObj : false;

  const degreeImage = weeklyAnalysis?.degree
    ? degreeImageMap[weeklyAnalysis.degree]
    : degreeImageMap['UNKNOWN'];

  useDoubleBackExit(true);

  return {
    weeklyAnalysis,
    isFutureDate,
    degreeImage,
    handlePressLeft,
    handlePressRight,
  };
};
