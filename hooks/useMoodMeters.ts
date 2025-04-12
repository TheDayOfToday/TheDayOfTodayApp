import { useQuery } from '@tanstack/react-query';
import { getMoodMeters } from '../api/record';

const useMoodMeters = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['moodMeters'],
    queryFn: () => getMoodMeters(),
  });

  return {
    diaryMood: data?.diaryMood,
    moodCategories: data?.moodCategory ?? [],
    loading: isLoading,
    error,
  };
};

export default useMoodMeters;
