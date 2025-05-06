import { APIRequest, HTTP_METHOD } from '@/api/APIRequest';
import { SignUpRequest, SignUpResponse, UserInfoResponse, DeleteUserResponse, LoginRequest, LoginResponse, UpdatePasswordResponse } from './entity';

export class DeleteUser<R extends DeleteUserResponse> implements APIRequest<R> {
  method = HTTP_METHOD.DELETE;
  path: string;
  response!: R;
  auth = true;

  constructor(public authorization: string) {
    this.path = `/user/delete`;
  }
}

export class GetUserInfo<R extends UserInfoResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path: string;
  response!: R;
  auth = true;

  constructor(public authorization: string) {
    this.path = `/user/info`;
  }
}

export class PostSignUp<R extends SignUpResponse> implements APIRequest<R> {
  method = HTTP_METHOD.POST;
  path: string;
  response!: R;
  data: SignUpRequest;

  constructor(userData: SignUpRequest) {
    this.path = `/user/signup`;
    this.data = userData;
  }
}

export class PostLogin implements APIRequest<LoginResponse> {
  method = HTTP_METHOD.POST;
  path = '/swagger-auth/login';
  response!: LoginResponse;
  auth = false;

  constructor(public data: LoginRequest) {}
}

export class UpdatePassword<R extends UpdatePasswordResponse> implements APIRequest<R> {
  method = HTTP_METHOD.PUT;
  path = '/user/update-password';
  response!: R;
  auth = true;

  constructor(public authorization: string, public password: string) {}
}