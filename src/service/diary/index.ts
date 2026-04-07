import APIClient from '../index';
import { APIRequest, HTTP_METHOD } from '../type';
import { CalendarRequest, CalendarColorResponse, DiaryResponse, AnalysisResponse } from './type';

class GetCalendarColor<R extends CalendarColorResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path: string;
  response!: R;
  constructor(public authorization: string, public data: CalendarRequest) {
    this.path = `/calendar/${data.year}/${data.month}`;
  }
}

class GetDiary<R extends DiaryResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path: string;
  response!: R;
  constructor(public authorization: string, public data: CalendarRequest) {
    this.path = `/calendar/diary/${data.year}/${data.month}/${data.day}`;
  }
}

class GetAnalysis<R extends AnalysisResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path: string;
  response!: R;
  constructor(public authorization: string, public data: CalendarRequest) {
    this.path = `/calendar/analysis/${data.year}/${data.month}/${data.day}`;
  }
}

export const getCalendarColor = APIClient.of(GetCalendarColor);
export const getDiary = APIClient.of(GetDiary);
export const getAnalysis = APIClient.of(GetAnalysis);
