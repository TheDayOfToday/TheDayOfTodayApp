import type { APIResponse } from '../responseType';

export type DeleteDiaryRequest = {
  year: string;
  month: string;
  day: string;
};

export interface DeleteResponse extends APIResponse {}

export interface StartConversationResponse extends APIResponse {
  diaryId: number;
}

export type DiarySuggestionMood = {
  moodName: string;
  moodColor: string;
};

export type MoodCategory = {
  degree: string;
  moods: Mood[];
};

export type Mood = {
  moodName: string;
  color: string;
};

export interface MoodMetersResponse extends APIResponse {
  diaryMood: DiarySuggestionMood;
  moodCategories: MoodCategory[];
}

export interface UpdateMoodRequest {
  moodName: string;
  moodColor: string;
}

export interface UpdateMoodResponse extends APIResponse {}

export interface DiaryResponse extends APIResponse {
  title: string;
  content: string;
}

export interface UpdateDiaryRequest {
  diaryId: number;
  title: string;
  content: string;
}

export interface UpdateDiaryResponse extends APIResponse {}

export interface DiaryAnalysisResponse extends APIResponse {
  analysis: string;
}
