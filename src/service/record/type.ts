import type { APIResponse } from '../responseType';

export interface DeleteDiaryRequest {
  year: string;
  month: string;
  day: string;
}

export type DeleteResponse = APIResponse;

export interface StartConversationResponse extends APIResponse {
  diaryId: number;
}

export interface DiarySuggestionMood {
  moodName: string;
  moodColor: string;
}

export interface MoodCategory {
  degree: string;
  moods: Mood[];
}

export interface Mood {
  moodName: string;
  color: string;
}

export interface MoodMetersResponse extends APIResponse {
  diaryMood: DiarySuggestionMood;
  moodCategories: MoodCategory[];
}

export interface UpdateMoodRequest {
  moodName: string;
  moodColor: string;
}

export type UpdateMoodResponse = APIResponse;

export interface DiaryResponse extends APIResponse {
  title: string;
  content: string;
}

export interface UpdateDiaryRequest {
  diaryId: number;
  title: string;
  content: string;
}

export type UpdateDiaryResponse = APIResponse;

export interface DiaryAnalysisResponse extends APIResponse {
  analysis: string;
}
