import { useEffect, useState } from 'react';
import { getDiary, getAnalysis } from '@/api/diary';
import { DiaryEntity, AnalysisEntity, CalendarRequest } from '@/api/diary/entity';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CalendarData {
  diaryEntry: DiaryEntity | null;
  analysisEntry: AnalysisEntity | null;
}

export function useCalendarData(date: { year: string; month: string; day: string }, modalVisible: boolean) {
  const [data, setData] = useState<CalendarData>({ diaryEntry: null, analysisEntry: null });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) throw new Error('No access token');

        const requestData: CalendarRequest = date;

        const [diaryRes, analysisRes] = await Promise.all([
          getDiary(token, requestData),
          getAnalysis(token, requestData)
        ]);

        setData({
          diaryEntry: diaryRes,
          analysisEntry: analysisRes,
        });
      } catch (err: any) {
        setError(err);
        setData({ diaryEntry: null, analysisEntry: null });
      } finally {
        setIsLoading(false);
      }
    };

    if (modalVisible) {
      fetchData();
    }
  }, [date, modalVisible]);

  return { data, isLoading, error };
}