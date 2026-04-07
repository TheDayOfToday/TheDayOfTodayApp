import APIClient from '../index';
import { APIRequest, HTTP_METHOD } from '../type';
import {
  DeleteDiaryRequest,
  DeleteResponse,
  StartConversationResponse,
  MoodMetersResponse,
  UpdateMoodRequest,
  UpdateMoodResponse,
  DiaryResponse,
  UpdateDiaryRequest,
  UpdateDiaryResponse,
  DiaryAnalysisResponse,
} from './type';

class DeleteDiary<R extends DeleteResponse> implements APIRequest<R> {
  method = HTTP_METHOD.DELETE;
  path: string;
  response!: R;
  constructor(public authorization: string, public data: DeleteDiaryRequest) {
    this.path = `/diary/delete/${data.year}/${data.month}/${data.day}`;
  }
}

class PostStartConversation<R extends StartConversationResponse> implements APIRequest<R> {
  method = HTTP_METHOD.POST;
  path = '/diary/conversation-mode/start';
  response!: R;
  constructor(public authorization: string) {}
}

class GetMoodMeters<R extends MoodMetersResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path: string;
  response!: R;
  constructor(public authorization: string, public diaryId: number) {
    this.path = `/diary/moodmeter?diaryId=${diaryId}`;
  }
}

class PostMoodMeters<R extends UpdateMoodResponse> implements APIRequest<R> {
  method = HTTP_METHOD.POST;
  path: string;
  response!: R;
  constructor(public authorization: string, public diaryId: number, public data: UpdateMoodRequest) {
    this.path = `/diary/moodmeter?diaryId=${diaryId}`;
  }
}

class GetDiary<R extends DiaryResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path: string;
  response!: R;
  constructor(public authorization: string, public diaryId: number) {
    this.path = `/diary/show?diaryId=${diaryId}`;
  }
}

class PutUpdateDiary<R extends UpdateDiaryResponse> implements APIRequest<R> {
  method = HTTP_METHOD.PUT;
  path = '/diary/update-diary';
  response!: R;
  constructor(public authorization: string, public data: UpdateDiaryRequest) {}
}

class PostDiaryAnalysis<R extends DiaryAnalysisResponse> implements APIRequest<R> {
  method = HTTP_METHOD.POST;
  path: string;
  response!: R;
  constructor(public authorization: string, public diaryId: number) {
    this.path = `/diary/analyze?diaryId=${diaryId}`;
  }
}

export const deleteDiary = APIClient.of(DeleteDiary);
export const postStartConversation = APIClient.of(PostStartConversation);
export const getMoodMeters = APIClient.of(GetMoodMeters);
export const postMoodMeters = APIClient.of(PostMoodMeters);
export const getDiary = APIClient.of(GetDiary);
export const putUpdateDiary = APIClient.of(PutUpdateDiary);
export const postDiaryAnalysis = APIClient.of(PostDiaryAnalysis);
