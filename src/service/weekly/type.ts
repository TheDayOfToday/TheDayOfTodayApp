import type { APIResponse } from '../responseType';

export interface AnalysisRequest {
  year: string;
  month: string;
  day: string;
}

export interface WeeklyAnalysisResponse extends APIResponse {
  year: number;
  month: number;
  day: number;
  title: string;
  degree: string;
  feedback: string;
  startDate: string;
  endDate: string;
}
