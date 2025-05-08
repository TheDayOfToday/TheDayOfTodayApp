import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCalendarColor } from '@/api/diary';
import useToken from './useToken';

const resolveDotColor = (raw: string) => {
  return raw === '미분석' ? '#ffffff' : raw;
};

const fetchAllMoodColors = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  if (!token) throw new Error('Access token not found');

  const year = new Date().getFullYear().toString();

  const monthPromises = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return getCalendarColor(token, { year, month, day: '01' });
  });

  const results = await Promise.all(monthPromises);
  const markedDates: { [key: string]: any } = {};

  results.forEach((res) => {
    Object.entries(res?.colors ?? {}).forEach(([date, color]) => {
      markedDates[date] = {
        marked: true,
        dotColor: resolveDotColor(color),
      };
    });
  });

  return markedDates;
};

export const useCalendarColors = () => {
  const token = useToken();
  const { data, isLoading } = useQuery({
    queryKey: ['calendarColors'],
    queryFn: fetchAllMoodColors,
    enabled: !!token,
  });

  return {
    markedDates: data ?? {},
    moodColorsReady: !!data && !isLoading,
  };
};
