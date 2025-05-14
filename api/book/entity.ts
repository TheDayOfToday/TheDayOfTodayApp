import type { APIResponse } from '../APIResponse';

export interface RecommendedBookResponse extends APIResponse {
  title: string;
  author: string;
  description: string;
  coverImageUrl: string;
};
