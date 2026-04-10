import { AxiosResponse } from 'axios';

import { APIResponse } from './responseType';

export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export type HTTPMethod = typeof HTTP_METHOD[keyof typeof HTTP_METHOD];

export type APIRequest<R extends APIResponse> = {
  response: R;
  path: string;
  method: HTTPMethod;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  baseURL?: string;
  authorization?: string;
  headers?: Record<string, string | number>;
  parse?: (data: AxiosResponse<R>) => R;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  convertBody?: (data: any) => any;
};
