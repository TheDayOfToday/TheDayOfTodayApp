import APIClient from '../apiClient';
import { GetDiary, GetAnalysis, GetCalendarColor } from './APIDetail';

export const getCalendarColor = APIClient.of(GetCalendarColor);

export const getDiary = APIClient.of(GetDiary);

export const getAnalysis = APIClient.of(GetAnalysis);
