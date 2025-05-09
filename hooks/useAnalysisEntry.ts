import { useQuery } from '@tanstack/react-query';
import { getAnalysis } from '@/api/diary';
import { CalendarRequest } from '@/api/diary/entity';
import useToken from './useToken';

export const useAnalysisEntry = (date: CalendarRequest, enabled: boolean) => {
  const token = useToken();
  return useQuery({
    queryKey: ['analysis', date],
    queryFn: async () => {
      return await getAnalysis(token!, date);
    },
    enabled,
    staleTime: 0,
  });
};
