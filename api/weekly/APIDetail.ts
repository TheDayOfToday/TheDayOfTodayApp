import { APIRequest, HTTP_METHOD } from "../APIRequest"
import { AnalysisRequest, WeeklyAnalysisResponse } from "./entity"

export class GetWeeklyAnalysis<R extends WeeklyAnalysisResponse> implements APIRequest<R> {
    method = HTTP_METHOD.GET;
    path: string;
    response!: R;
    auth = true;
    constructor(public authorization: string, public data: AnalysisRequest) {
        this.path = `/weeklyAnalysis/${data.year}/${data.month}/${data.day}`;
    }
}
