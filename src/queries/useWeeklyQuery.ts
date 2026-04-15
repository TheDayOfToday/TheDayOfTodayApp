import { useQuery } from '@tanstack/react-query';

import { weeklyKeys } from '@/src/interface/key/queryKey';
import { getWeeklyAnalysis } from '@/src/service/weekly';
import { AnalysisRequest } from '@/src/service/weekly/type';

export const useGetWeeklyAnalysis = ({ token, date }: { token: string; date: AnalysisRequest }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: weeklyKeys.analysis(date.year, date.month, date.day),
    queryFn: () => getWeeklyAnalysis(token, date),
    enabled: !!token && !!date,
  });

  return { data, isLoading, error };
};
