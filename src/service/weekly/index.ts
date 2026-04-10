import APIClient from '../index';
import { APIRequest, HTTP_METHOD } from '../type';

import { AnalysisRequest, WeeklyAnalysisResponse } from './type';

class GetWeeklyAnalysis<R extends WeeklyAnalysisResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path: string;
  response!: R;
  constructor(public authorization: string, public data: AnalysisRequest) {
    this.path = `/weeklyAnalysis/${data.year}/${data.month}/${data.day}`;
  }
}

export const getWeeklyAnalysis = APIClient.of(GetWeeklyAnalysis);
