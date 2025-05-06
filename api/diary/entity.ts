import type { APIResponse } from '../APIResponse';

export type Mood = {
  moodName: string;
  color: string;
};

export type MoodMeter = {
  degree: string;
  moods: Mood[];
};

export type MoodMetersResponse = MoodMeter[];

export type CalendarRequest = {
  year: string;
  month: string;
  day: string;
};

// 캘린더 한 달 컬러
export type Color = {
  [date: string]: string;
};

export interface CalendarColorResponse {
  colors: Color;
};

// 캘린더 일기 내용
export interface DiaryEntity {
  title: string;
  content: string;
};

// 캘린더 AI 분석 내용
export interface AnalysisEntity {
  analysis: string;
};
