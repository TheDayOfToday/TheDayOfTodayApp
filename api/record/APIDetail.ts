import { APIRequest, HTTP_METHOD } from '../APIRequest';
import type {
  DeleteResponse,
  StartConversationResponse,
  QuestionRequest,
  QuestionResponse,
  EndConversationResponse,
  EndMonologueResponse,
  MoodMetersResponse,
  UpdateMoodRequest,
  UpdateMoodResponse,
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

export class PostEndMonologue<R extends EndMonologueResponse> implements APIRequest<R> {
  method = HTTP_METHOD.POST;
  path: string;
  response!: R;
  auth = true;
  constructor(public authorization: string, public file: File) {
    this.path = `/diary/monologue/start?file=${file}`;
  }
}

export class GetMoodMeters<R extends MoodMetersResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path = '/diary/moodmeter';
  response!: R;
  auth = true;
}

export class PostMoodMeters<R extends UpdateMoodResponse> implements APIRequest<R> {
  method = HTTP_METHOD.POST;
  path = '/diary/moodmeter';
  response!: R;
  auth = true;
  constructor(public data: UpdateMoodRequest) { }
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
    this.path = `/diary/analysis?diaryId=${diaryId}`;
  }
}
