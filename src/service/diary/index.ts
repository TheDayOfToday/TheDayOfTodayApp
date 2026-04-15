import apiClient, { authHeader } from '../index';

import type { CalendarRequest, CalendarColorResponse, DiaryResponse, AnalysisResponse } from './type';

export const getCalendarColor = async (token: string, date: CalendarRequest) => {
  const { data } = await apiClient.get<CalendarColorResponse>(
    `/calendar/${date.year}/${date.month}`,
    { headers: authHeader(token) },
  );
  return data;
};

export const getDiary = async (token: string, date: CalendarRequest) => {
  const { data } = await apiClient.get<DiaryResponse>(
    `/calendar/diary/${date.year}/${date.month}/${date.day}`,
    { headers: authHeader(token) },
  );
  return data;
};

export const getAnalysis = async (token: string, date: CalendarRequest) => {
  const { data } = await apiClient.get<AnalysisResponse>(
    `/calendar/analysis/${date.year}/${date.month}/${date.day}`,
    { headers: authHeader(token) },
  );
  return data;
};
