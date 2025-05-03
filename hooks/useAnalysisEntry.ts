import { useQuery } from '@tanstack/react-query';
import { getAnalysis } from '@/api/diary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalendarRequest } from '@/api/diary/entity';

export const useAnalysisEntry = (date: CalendarRequest, enabled: boolean) => {
  return useQuery({
    queryKey: ['analysis', date],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) throw new Error('토큰 없음');
      return await getAnalysis(token, date);
    },
    enabled,
    staleTime: 0,
  });
};