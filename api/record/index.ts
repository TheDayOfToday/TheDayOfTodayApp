import APIClient from '../apiClient';
import {
  DeleteDiary,
  PostStartConversation,
  PostQuestion,
  PostEndConversation,
  PostEndMonologue,
  GetMoodMeters,
  PostMoodMeters,
  PutUpdateDiary,
  PostDiaryAnalysis,
} from './APIDetail';

export const deleteDiary = APIClient.of(DeleteDiary);

export const postStartConversation = APIClient.of(PostStartConversation);

export const postQuestion = APIClient.of(PostQuestion);

export const postEndConversation = APIClient.of(PostEndConversation);

export const postEndMonologue = APIClient.of(PostEndMonologue);

export const getMoodMeters = APIClient.of(GetMoodMeters);

export const postMoodMeters = APIClient.of(PostMoodMeters);

export const putUpdateDiary = APIClient.of(PutUpdateDiary);

export const postDiaryAnalysis = APIClient.of(PostDiaryAnalysis);
