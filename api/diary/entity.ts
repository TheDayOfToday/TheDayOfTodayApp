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

export interface DiaryResponse extends APIResponse {
  date: string;
  entries: {
    title: string;
    content: string;
  }[];
  analysisResults: {
    content: string;
    diaryMood: {
      moodName: string;
      moodColor: string;
    };
  }[];  
};



export type Color = {
  [date: string]: string;
};

export interface CalendarColorResponse {
  colors: Color;
};

export interface DiaryEntity {
  title: string;
  content: string;
};

export interface AnalysisEntity {
  analysis: string;
};
