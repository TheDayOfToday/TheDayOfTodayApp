import { useQuery } from '@tanstack/react-query';
import { getDiary } from '@/api/diary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalendarRequest } from '@/api/diary/entity';

export const useDiaryEntry = (date: CalendarRequest, enabled: boolean, version: number) => {
  return useQuery({
    queryKey: ['diary', date, version],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) throw new Error('토큰 없음');      
      return await getDiary(token, date);
    },
    enabled,
    staleTime: 0,
  });
};
