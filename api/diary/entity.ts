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

export type DiaryData = {
  title: string;
  content: string;
};

export type AnalysisData = {  
  content: string;
  moodName: string;
  moodColor: string;
};

export type CalendarRequest = {
  year: string;
  month: string;
  day: string;
};

export interface DiaryResponse extends APIResponse {
  date: string;
  diary: DiaryData;
  analysis: AnalysisData;
};
