import axios, { AxiosResponse, AxiosError } from 'axios';
import Constants from 'expo-constants';
import qs from 'qs';

import { APIResponse } from './responseType';
import { APIRequest, HTTP_METHOD } from './type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;
type ResponseType<T> = T extends APIRequest<infer R> ? R : never;

export default class APIClient {
  static shared = new APIClient();

  static request<U extends APIResponse>(request: APIRequest<U>): Promise<U> {
    return APIClient.shared.request(request);
  }

  static toCallable<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends Constructor<any>,
    U extends InstanceType<T>,
    R extends ResponseType<U>,
  >(api: T) {
    return (...args: ConstructorParameters<T>) => APIClient.request<R>(new api(...args));
  }

  static of = APIClient.toCallable;

  baseURL = Constants.expoConfig?.extra?.API_BASE_URL;
  timeout = 10000;

  request<U extends APIResponse>(request: APIRequest<U>): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      axios.request({
        url: request.path,
        method: request.method,
        params: request.params,
        data: request.data instanceof FormData
          ? request.data
          : JSON.stringify(request.data),
        paramsSerializer: params => qs.stringify(params),
        timeout: this.timeout,
        baseURL: request.baseURL || this.baseURL,
        headers: this.createHeaders(request),
        responseType: 'json',
      })
        .then((res: AxiosResponse<U>) => resolve(res.data))
        .catch((error: AxiosError) => reject(error));
    });
  }

  private createHeaders<U extends APIResponse>(request: APIRequest<U>) {
    const headers: Record<string, string> = {};

    if (request.authorization) {
      headers.Authorization = `Bearer ${request.authorization}`;
    }

    if (
      (
        request.method === HTTP_METHOD.POST ||
        request.method === HTTP_METHOD.PUT ||
        request.method === HTTP_METHOD.DELETE
      ) &&
      !(request.data instanceof FormData)
    ) {
      headers['Content-Type'] = 'application/json';
    }

    if (request.headers) {
      Object.assign(headers, request.headers);
    }

    return headers;
  }
}
