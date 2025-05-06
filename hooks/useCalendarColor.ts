// useCalendarColors.ts
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCalendarColor } from '@/api/diary';

const resolveDotColor = (raw: string) => {
  if (raw === '미분석') return '#E8E8E8';
  return raw;
};

const fetchAllMoodColors = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  if (!token) throw new Error('Access token not found');

  const thisYear = new Date().getFullYear();
  const monthRequests = [];

  for (let m = 1; m <= 12; m++) {
    const monthStr = m.toString().padStart(2, '0');
    monthRequests.push({
      monthStr,
      request: getCalendarColor(token, {
        year: thisYear.toString(),
        month: monthStr,
        day: '01',
      }),
    });
  }

  const earlyResults = await Promise.all(monthRequests.slice(0, 2).map((m) => m.request));
  const markedDates: { [key: string]: any } = {};
  earlyResults.forEach((res) => {
    Object.entries(res?.colors ?? {}).forEach(([date, color]) => {
      markedDates[date] = {
        marked: true,
        dotColor: resolveDotColor(color),
      };
    });
  });

  const lateResults = await Promise.all(monthRequests.slice(2).map((m) => m.request));
  lateResults.forEach((res) => {
    Object.entries(res?.colors ?? {}).forEach(([date, color]) => {
      markedDates[date] = {
        marked: true,
        dotColor: resolveDotColor(color),
      };
    });
  });

  return markedDates;
};

export const useCalendarColors = (version: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['calendarColors', version],
    queryFn: fetchAllMoodColors,
  });

  return {
    markedDates: data ?? {},
    moodColorsReady: !!data && !isLoading,
  };
};
    