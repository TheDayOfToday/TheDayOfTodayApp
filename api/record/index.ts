import APIClient from '../apiClient';
import {
  DeleteDiary,
  PostStartConversation,
  GetMoodMeters,
  PostMoodMeters,
  GetDiary,
  PutUpdateDiary,
  PostDiaryAnalysis,
} from './APIDetail';

export const deleteDiary = APIClient.of(DeleteDiary);

export const postStartConversation = APIClient.of(PostStartConversation);

export const getMoodMeters = APIClient.of(GetMoodMeters);

export const postMoodMeters = APIClient.of(PostMoodMeters);

export const getDiary = APIClient.of(GetDiary);

export const putUpdateDiary = APIClient.of(PutUpdateDiary);

export const postDiaryAnalysis = APIClient.of(PostDiaryAnalysis);
