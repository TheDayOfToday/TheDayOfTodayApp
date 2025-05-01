import { useQuery } from '@tanstack/react-query';
import { getDiary, getAnalysis } from '@/api/diary/index';
import { CalendarRequest } from '@/api/diary/entity';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCalendarData = (date: CalendarRequest, enabled: boolean) => {
    return useQuery({
      queryKey: ['calendarData', date.year, date.month, date.day],
      queryFn: async () => {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) throw new Error('토큰이 없습니다.');
  
        const [diaryJson, analysisJson] = await Promise.all([
          getDiary(token, date),
          getAnalysis(token, date),
        ]);
  
        const diaryEntry = diaryJson.entries?.[0];
        const analysisEntry = analysisJson.analysisResults?.[0];
        // console.log('Diary Entry:', diaryEntry);
        // console.log('Analysis Entry:', analysisEntry);
        // console.log('Diary JSON:', diaryJson);
        // console.log('Analysis JSON:', analysisJson);
  
        return { diaryEntry, analysisEntry };
      },
      enabled,
    });
  };
  
