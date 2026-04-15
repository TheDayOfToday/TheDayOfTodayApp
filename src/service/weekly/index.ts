import apiClient, { authHeader } from '../index';

import type { AnalysisRequest, WeeklyAnalysisResponse } from './type';

export const getWeeklyAnalysis = async (token: string, date: AnalysisRequest) => {
  const { data } = await apiClient.get<WeeklyAnalysisResponse>(
    `/weeklyAnalysis/${date.year}/${date.month}/${date.day}`,
    { headers: authHeader(token) },
  );
  return data;
};
