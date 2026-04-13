import apiClient, { authHeader } from '../index';

import type { RecommendedBookResponse } from './type';

export const getRecommendedBook = async (token: string) => {
  const { data } = await apiClient.get<RecommendedBookResponse>('/book/show', {
    headers: authHeader(token),
  });
  return data;
};

export const postRecommendedBook = async (token: string, diaryId: number) => {
  const { data } = await apiClient.post<string>(`/book/recommend?diaryId=${diaryId}`, null, {
    headers: authHeader(token),
  });
  return data;
};
