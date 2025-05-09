import type { APIResponse } from '../APIResponse';

// 캘린더 request
export type CalendarRequest = {
  year: string;
  month: string;
  day: string;
};

export type Color = {
  [date: string]: string;
};

// 캘린더 한 달 컬러
export interface CalendarColorResponse extends APIResponse {
  colors: Color;
};

// 캘린더 일기 내용
export interface DiaryResponse extends APIResponse {
  title: string;
  content: string;
};

// 캘린더 AI 분석 내용
export interface AnalysisResponse extends APIResponse {
  analysis: string;
};
