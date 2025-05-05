import { APIRequest, HTTP_METHOD } from '@/api/APIRequest';
import { UserInfoResponse } from './entity';

export class GetUserInfo<R extends UserInfoResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path: string;
  response!: R;
  auth = true;

  constructor(public authorization: string) {
    this.path = `/user/info`;
  }
}
