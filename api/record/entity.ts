import type { APIResponse } from '../APIResponse';

// 일기 삭제
export interface DeleteResponse extends APIResponse { }

// 대화 모드 - 시작
export interface StartConversationResponse extends APIResponse {
  diaryId: number;
}

// 대화 모드 - 질문
export type QuestionRequest = {
  question: string;
  diaryId: number;
  file: File;
}

export interface QuestionResponse extends APIResponse {
  question: string;
}

// 대화 모드 - 종료
export interface EndConversationResponse extends APIResponse {
  diaryId: number;
}

// AI 추천 및 무드미터 조회
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
};

// 무드미터 저장
export type DiaryMood = {
  moodName: string;
  moodColor: string;
}

export interface UpdateMoodRequest {
  diaryMood: DiaryMood;
}

export interface UpdateMoodResponse extends APIResponse { }

// 일기 업데이트 (사용자 수정)
export interface UpdateDiaryRequest {
  title: string;
  content: string;
}

export interface UpdateDiaryResponse extends APIResponse { }

// 일기 분석 조회 및 저장
export interface DiaryAnalysisResponse extends APIResponse {
  analysis: string;
}
