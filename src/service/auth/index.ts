import APIClient from '../index';
import { APIRequest, HTTP_METHOD } from '../type';

import {
  SignUpRequest,
  SignUpResponse,
  UserInfoResponse,
  DeleteUserResponse,
  LoginRequest,
  LoginResponse,
  EditPasswordRequest,
  FindEmailResponse,
  SendCodeRequest,
  SendCodeResponse,
  CheckCodeRequest,
  CheckCodeResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from './type';

class DeleteUser<R extends DeleteUserResponse> implements APIRequest<R> {
  method = HTTP_METHOD.DELETE;
  path = '/user/delete';
  response!: R;
  constructor(public authorization: string) {}
}

class GetUserInfo<R extends UserInfoResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path = '/user/info';
  response!: R;
  constructor(public authorization: string) {}
}

class PostSignUp<R extends SignUpResponse> implements APIRequest<R> {
  method = HTTP_METHOD.POST;
  path = '/user/signup';
  response!: R;
  constructor(public data: SignUpRequest) {}
}

class PostLogin implements APIRequest<LoginResponse> {
  method = HTTP_METHOD.POST;
  path = '/swagger-auth/login';
  response!: LoginResponse;
  constructor(public data: LoginRequest) {}
}

class UpdatePassword implements APIRequest<string> {
  method = HTTP_METHOD.PUT;
  path = '/user/update-password';
  response!: string;
  constructor(public authorization: string, public data: EditPasswordRequest) {}
}

class GetFindEmail implements APIRequest<FindEmailResponse> {
  method = HTTP_METHOD.GET;
  path: string;
  response!: FindEmailResponse;
  constructor(public email: string) {
    this.path = `/user/find-email?email=${email}`;
  }
}

class PostSendCode implements APIRequest<SendCodeResponse> {
  method = HTTP_METHOD.POST;
  path = '/user/send-code';
  response!: SendCodeResponse;
  constructor(public data: SendCodeRequest) {}
}

class PostCheckCode implements APIRequest<CheckCodeResponse> {
  method = HTTP_METHOD.POST;
  path = '/user/check-code';
  response!: CheckCodeResponse;
  constructor(public data: CheckCodeRequest) {}
}

class PutResetPassword implements APIRequest<ResetPasswordResponse> {
  method = HTTP_METHOD.PUT;
  path = '/user/reset-password';
  response!: ResetPasswordResponse;
  constructor(public data: ResetPasswordRequest) {}
}

export const deleteUser = APIClient.of(DeleteUser);
export const getUserInfo = APIClient.of(GetUserInfo);
export const postSignUp = APIClient.of(PostSignUp);
export const postLogin = APIClient.of(PostLogin);
export const updatePassword = APIClient.of(UpdatePassword);
export const getFindEmail = APIClient.of(GetFindEmail);
export const postSendCode = APIClient.of(PostSendCode);
export const postCheckCode = APIClient.of(PostCheckCode);
export const putResetPassword = APIClient.of(PutResetPassword);
