import { APIRequest, HTTP_METHOD } from "../APIRequest"
import { CalendarRequest, CalendarColorResponse, DiaryEntity, AnalysisEntity } from "./entity"

export class GetCalendarColor<R extends CalendarColorResponse> implements APIRequest<R> {
    method = HTTP_METHOD.GET;
    path: string;
    response!: R;
    auth = true;

    constructor(public authorization: string, public data: CalendarRequest) {
        const { year, month } = data;
        this.path = `/calendar/${year}/${month}`;
    }
}

export class GetDiary<R extends DiaryEntity> implements APIRequest<R> {
    method = HTTP_METHOD.GET;
    path: string;
    response!: R;
    auth = true;

    constructor(public authorization: string, public data: CalendarRequest) {
        const { year, month, day } = data;
        this.path = `/calendar/diary/${year}/${month}/${day}`;
    }
}

export class GetAnalysis<R extends AnalysisEntity> implements APIRequest<R> {
    method = HTTP_METHOD.GET;
    path: string;
    response!: R;
    auth = true;
  
    constructor(public authorization: string, public data: CalendarRequest) {
        const { year, month, day } = data;
        this.path = `/calendar/analysis/${year}/${month}/${day}`;
    }
}
