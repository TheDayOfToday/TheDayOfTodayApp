import { useQuery } from '@tanstack/react-query';
import { getDiary } from '@/api/diary';
import { CalendarRequest } from '@/api/diary/entity';
import useToken from './useToken';

export const useDiaryEntry = (date: CalendarRequest, enabled: boolean) => {
  const token = useToken();
  return useQuery({
    queryKey: ['diary', date],
    queryFn: async () => {
      if (!token) throw new Error('토큰 없음');      
      return await getDiary(token, date);
    },
    enabled,
    staleTime: 0,
  });
};
