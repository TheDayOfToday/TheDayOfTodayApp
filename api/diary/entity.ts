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
  // diary: DiaryData;
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
