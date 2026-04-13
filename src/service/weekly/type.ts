export interface AnalysisRequest {
  year: string;
  month: string;
  day: string;
}

export interface WeeklyAnalysisResponse {
  year: number;
  month: number;
  day: number;
  title: string;
  degree: string;
  feedback: string;
  startDate: string;
  endDate: string;
}
