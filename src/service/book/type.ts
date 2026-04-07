import type { APIResponse } from '../responseType';

export interface RecommendedBookResponse extends APIResponse {
  title: string;
  author: string;
  description: string;
  coverImageUrl: string;
}
