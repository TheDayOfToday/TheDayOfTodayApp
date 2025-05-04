import APIClient from '../apiClient';
import { GetWeeklyAnalysis } from './APIDetail';

export const getWeeklyAnalysis = APIClient.of(GetWeeklyAnalysis);
