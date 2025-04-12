// api/mood/useMoodMeters.ts
import { useQuery } from '@tanstack/react-query';
import { getMoodMeters } from '../api/record';

const useMoodMeters = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['moodMeters'],
    queryFn: () => getMoodMeters(),
  });

  return {
    data: data ?? [],
    loading: isLoading,
    error,
  };
};

export default useMoodMeters;
