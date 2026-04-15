import apiClient, { authHeader } from '../index';

import type {
  DeleteDiaryRequest,
  StartConversationResponse,
  MoodMetersResponse,
  UpdateMoodRequest,
  DiaryResponse,
  UpdateDiaryRequest,
  DiaryAnalysisResponse,
} from './type';

export const deleteDiary = async (token: string, date: DeleteDiaryRequest) => {
  const { data } = await apiClient.delete(
    `/diary/delete/${date.year}/${date.month}/${date.day}`,
    { headers: authHeader(token) },
  );
  return data;
};

export const postStartConversation = async (token: string) => {
  const { data } = await apiClient.post<StartConversationResponse>(
    '/diary/conversation-mode/start',
    null,
    { headers: authHeader(token) },
  );
  return data;
};

export const getMoodMeters = async (token: string, diaryId: number) => {
  const { data } = await apiClient.get<MoodMetersResponse>(
    `/diary/moodmeter?diaryId=${diaryId}`,
    { headers: authHeader(token) },
  );
  return data;
};

export const postMoodMeters = async (token: string, diaryId: number, body: UpdateMoodRequest) => {
  const { data } = await apiClient.post(
    `/diary/moodmeter?diaryId=${diaryId}`,
    body,
    { headers: authHeader(token) },
  );
  return data;
};

export const getDiary = async (token: string, diaryId: number) => {
  const { data } = await apiClient.get<DiaryResponse>(
    `/diary/show?diaryId=${diaryId}`,
    { headers: authHeader(token) },
  );
  return data;
};

export const putUpdateDiary = async (token: string, body: UpdateDiaryRequest) => {
  const { data } = await apiClient.put(
    '/diary/update-diary',
    body,
    { headers: authHeader(token) },
  );
  return data;
};

export const postDiaryAnalysis = async (token: string, diaryId: number) => {
  const { data } = await apiClient.post<DiaryAnalysisResponse>(
    `/diary/analyze?diaryId=${diaryId}`,
    null,
    { headers: authHeader(token) },
  );
  return data;
};
