export interface DeleteDiaryRequest {
  year: string;
  month: string;
  day: string;
}

export interface StartConversationResponse {
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

export interface MoodMetersResponse {
  diaryMood: DiarySuggestionMood;
  moodCategories: MoodCategory[];
}

export interface UpdateMoodRequest {
  moodName: string;
  moodColor: string;
}

export interface DiaryResponse {
  title: string;
  content: string;
}

export interface UpdateDiaryRequest {
  diaryId: number;
  title: string;
  content: string;
}

export interface DiaryAnalysisResponse {
  analysis: string;
}
