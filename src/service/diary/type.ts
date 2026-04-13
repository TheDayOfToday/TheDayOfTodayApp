import type { APIResponse } from '../responseType';

export interface CalendarRequest {
  year: string;
  month: string;
  day: string;
}

export type Color = Record<string, string>;

export interface CalendarColorResponse extends APIResponse {
  colors: Color;
}

export interface DiaryResponse extends APIResponse {
  title: string;
  content: string;
}

export interface AnalysisResponse extends APIResponse {
  analysis: string;
}
