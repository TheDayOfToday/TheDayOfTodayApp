import APIClient from '../index';
import { APIRequest, HTTP_METHOD } from '../type';
import { RecommendedBookResponse } from './type';

class GetRecommendedBook<R extends RecommendedBookResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path = '/book/show';
  response!: R;
  constructor(public authorization: string) {}
}

class PostBookRecommendation implements APIRequest<string> {
  method = HTTP_METHOD.POST;
  path: string;
  response!: string;
  constructor(public authorization: string, public diaryId: number) {
    this.path = `/book/recommend?diaryId=${diaryId}`;
  }
}

export const getRecommendedBook = APIClient.of(GetRecommendedBook);
export const postRecommendedBook = APIClient.of(PostBookRecommendation);
