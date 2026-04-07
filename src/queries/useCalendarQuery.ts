import { useQuery } from '@tanstack/react-query';
import { getCalendarColor, getAnalysis } from '@/src/service/diary';
import { CalendarRequest } from '@/src/service/diary/type';
import useToken from '@/src/hooks/useToken';
import { QUERY_KEY } from '@/src/interface/key/queryKey';

const resolveDotColor = (raw: string) => {
  return raw === '미분석' ? '#ffffff' : raw;
};

export const useCalendarColors = () => {
  const token = useToken();

  const fetchAllMoodColors = async () => {
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

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEY.CALENDAR.COLORS(),
    queryFn: fetchAllMoodColors,
    enabled: !!token,
  });

  return {
    markedDates: data ?? {},
    moodColorsReady: !!data && !isLoading,
  };
};

export const useDiaryEntry = (date: CalendarRequest, enabled: boolean) => {
  const token = useToken();
  return useQuery({
    queryKey: QUERY_KEY.CALENDAR.DIARY(date.year, date.month, date.day),
    queryFn: async () => {
      if (!token) throw new Error('토큰 없음');
      return await getAnalysis(token, date);
    },
    enabled,
    staleTime: 0,
  });
};

export const useAnalysisEntry = (date: CalendarRequest, enabled: boolean) => {
  const token = useToken();
  return useQuery({
    queryKey: QUERY_KEY.CALENDAR.ANALYSIS(date.year, date.month, date.day),
    queryFn: async () => {
      return await getAnalysis(token!, date);
    },
    enabled,
    staleTime: 0,
  });
};
