import APIClient from '../apiClient';
import { GetRecommendedBook, PostBookRecommendation } from './APIDetail';

export const postRecommendedBook= APIClient.of(PostBookRecommendation);

export const getRecommendedBook = APIClient.of(GetRecommendedBook);
