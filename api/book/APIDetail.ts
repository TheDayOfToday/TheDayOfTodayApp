import { APIRequest, HTTP_METHOD } from "../APIRequest"
import { RecommendedBookResponse } from "./entity"

export class GetRecommendedBook<R extends RecommendedBookResponse> implements APIRequest<R> {
    method = HTTP_METHOD.GET;
    path = '/book/show';
    response!: R;
    auth = true;

    constructor(public authorization: string) { }
}

export class PostBookRecommendation implements APIRequest<string> {
    method = HTTP_METHOD.POST;
    path: string;
    response!: string;
    auth = true;

    constructor(public authorization: string, public diaryId: number) {
        this.path = `/book/recommend?diaryId=${diaryId}`;
    }
}
