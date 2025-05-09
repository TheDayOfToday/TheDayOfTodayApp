import { APIRequest, HTTP_METHOD } from "../APIRequest"
import { CalendarRequest, CalendarColorResponse, DiaryResponse, AnalysisResponse } from "./entity"

export class GetCalendarColor<R extends CalendarColorResponse> implements APIRequest<R> {
    method = HTTP_METHOD.GET;
    path: string;
    response!: R;
    auth = true;

    constructor(public authorization: string, public data: CalendarRequest) {
        this.path = `/calendar/${data.year}/${data.month}`;
    }
}

export class GetDiary<R extends DiaryResponse> implements APIRequest<R> {
    method = HTTP_METHOD.GET;
    path: string;
    response!: R;
    auth = true;

    constructor(public authorization: string, public data: CalendarRequest) {
        this.path = `/calendar/diary/${data.year}/${data.month}/${data.day}`;
    }
}

export class GetAnalysis<R extends AnalysisResponse> implements APIRequest<R> {
    method = HTTP_METHOD.GET;
    path: string;
    response!: R;
    auth = true;

    constructor(public authorization: string, public data: CalendarRequest) {
        this.path = `/calendar/analysis/${data.year}/${data.month}/${data.day}`;
    }
}
