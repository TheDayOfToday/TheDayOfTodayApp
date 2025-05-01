import { APIRequest, HTTP_METHOD } from '../APIRequest';
import type {
  DeleteResponse,
  StartConversationResponse,
  QuestionRequest,
  QuestionResponse,
  EndConversationResponse,
  MoodMetersResponse,
  UpdateMoodRequest,
  UpdateMoodResponse,
  DiaryResponse,
  UpdateDiaryRequest,
  UpdateDiaryResponse,
  DiaryAnalysisResponse,
} from './entity';

export class DeleteDiary<R extends DeleteResponse> implements APIRequest<R> {
  method = HTTP_METHOD.DELETE;
  path: string;
  response!: R;
  auth = true;
  constructor(public authorization: string, public diaryId: number) {
    this.path = `/diary/delete/${diaryId}`;
  }
}

export class PostStartConversation<R extends StartConversationResponse> implements APIRequest<R> {
  method = HTTP_METHOD.POST;
  path = '/diary/conversation-mood/start';
  response!: R;
  auth = true;
  constructor(public authorization: string) { }
}

export class PostQuestion<R extends QuestionResponse> implements APIRequest<R> {
  method = HTTP_METHOD.POST;
  path = '/diary/conversation-mood/next-question';
  response!: R;
  auth = true;
  constructor(public authorization: string, public data: QuestionRequest) {
    this.path = `/diary/conversation-mode/next-question?question=${data.question}&diaryId=${data.diaryId}&file=${data.file}`;
  }
}

export class PostEndConversation<R extends EndConversationResponse> implements APIRequest<R> {
  method = HTTP_METHOD.POST;
  path: string;
  response!: R;
  auth = true;
  constructor(public authorization: string, public diaryId: number) {
    this.path = `/diary/conversation-mood/complete?diaryId=${diaryId}`;
  }
}

export class GetMoodMeters<R extends MoodMetersResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path: string;
  response!: R;
  auth = true;
  constructor(public authorization: string, public diaryId: number) {
    this.path = `/diary/moodmeter?diaryId=${diaryId}`;
  }
}

export class PostMoodMeters<R extends UpdateMoodResponse> implements APIRequest<R> {
  method = HTTP_METHOD.POST;
  path: string;
  response!: R;
  auth = true;
  constructor(public authorization: string, public diaryId: number, public data: UpdateMoodRequest) {
    this.path = `/diary/moodmeter?diaryId=${diaryId}`;
  }
}

export class GetDiary<R extends DiaryResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path: string;
  response!: R;
  auth = true;
  constructor(public authorization: string, public diaryId: number) {
    this.path = `/diary/show?diaryId=${diaryId}`;
  }
}

export class PutUpdateDiary<R extends UpdateDiaryResponse> implements APIRequest<R> {
  method = HTTP_METHOD.PUT;
  path = '/diary/update-diary';
  response!: R;
  auth = true;
  constructor(public authorization: string, public data: UpdateDiaryRequest) { }
}

export class PostDiaryAnalysis<R extends DiaryAnalysisResponse> implements APIRequest<R> {
  method = HTTP_METHOD.POST;
  path: string;
  response!: R;
  auth = true;
  constructor(public authorization: string, public diaryId: number) {
    this.path = `/diary/analyze?diaryId=${diaryId}`;
  }
}
