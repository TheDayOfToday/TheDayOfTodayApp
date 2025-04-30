import { APIRequest, HTTP_METHOD } from "../APIRequest"
import { DiaryResponse } from "./entity"
import { CalendarRequest } from "./entity";

export class GetDiary<R extends DiaryResponse> implements APIRequest<R> {
    method = HTTP_METHOD.GET;
    path: string;
    response!: R;
    auth = true;

    constructor(public authorization: string, public data: CalendarRequest) {
        const { year, month, day } = data;
        this.path = `/calendar/diary/${year}/${month}/${day}`;
    }
}

export class GetAnalysis<R extends DiaryResponse> implements APIRequest<R> {
    method = HTTP_METHOD.GET;
    path: string;
    response!: R;
    auth = true;
  
    constructor(public authorization: string, public data: CalendarRequest) {
        const { year, month, day } = data;
        this.path = `/calendar/analysis/${year}/${month}/${day}`;
    }
}
