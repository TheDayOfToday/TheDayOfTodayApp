export interface CalendarRequest {
  year: string;
  month: string;
  day: string;
}

export type Color = Record<string, string>;

export interface CalendarColorResponse {
  colors: Color;
}

export interface DiaryResponse  {
  title: string;
  content: string;
}

export interface AnalysisResponse  {
  analysis: string;
}
