import { useQuery } from '@tanstack/react-query';
import { AnalysisRequest } from '@/api/weekly/entity';
import { getWeeklyAnalysis } from '@/api/weekly';

interface GetWeeklyAnalysisProps {
  token: string;
  date: AnalysisRequest;
}

const useGetWeeklyAnalysis = ({token, date}: GetWeeklyAnalysisProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weeklyAnalysis', date.year, date.month, date.day],
    queryFn: () => getWeeklyAnalysis(token, date),
    enabled: !!token && !!date,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetWeeklyAnalysis;
