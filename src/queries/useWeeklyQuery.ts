import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '@/src/interface/key/queryKey';
import { getWeeklyAnalysis } from '@/src/service/weekly';
import { AnalysisRequest } from '@/src/service/weekly/type';

export const useGetWeeklyAnalysis = ({ token, date }: { token: string; date: AnalysisRequest }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEY.WEEKLY.ANALYSIS(date.year, date.month, date.day),
    queryFn: () => getWeeklyAnalysis(token, date),
    enabled: !!token && !!date,
  });

  return { data, isLoading, error };
};
