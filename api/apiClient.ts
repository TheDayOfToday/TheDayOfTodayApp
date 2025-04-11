// utils/ts/apiClient.ts (React Native 용)
import axios, { AxiosResponse, AxiosError } from 'axios';
import { APIRequest, HTTP_METHOD } from './APIRequest';
import { APIResponse } from './APIResponse';
import qs from 'qs';
import Constants from 'expo-constants';

type Constructor<T> = new (...args: any[]) => T;

// APIRequest에서 Response 타입 추출
type ResponseType<T> = T extends APIRequest<infer R> ? R : never;

export default class APIClient {
  static shared = new APIClient();

  static request<U extends APIResponse>(request: APIRequest<U>): Promise<U> {
    return APIClient.shared.request(request);
  }

  /** API 클래스를 함수처럼 사용할 수 있게 변환 */
  static toCallable<
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
      request.method === HTTP_METHOD.POST ||
      request.method === HTTP_METHOD.PUT
    ) {
      headers['Content-Type'] = 'application/json';
    }

    if (request.headers) {
      Object.assign(headers, request.headers);
    }

    return headers;
  }
}
