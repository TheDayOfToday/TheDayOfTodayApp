import APIClient from '../apiClient';
import { GetDiary, GetAnalysis } from './APIDetail';

export const getDiary = APIClient.of(GetDiary);

export const getAnalysis = APIClient.of(GetAnalysis);
