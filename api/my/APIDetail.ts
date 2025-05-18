import { APIRequest, HTTP_METHOD } from '@/api/APIRequest';
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
} from './entity';

// 유저 탈퇴
export class DeleteUser<R extends DeleteUserResponse> implements APIRequest<R> {
  method = HTTP_METHOD.DELETE;
  path: string;
  response!: R;
  auth = true;

  constructor(public authorization: string) {
    this.path = `/user/delete`;
  }
}

// 유저 정보 조회
export class GetUserInfo<R extends UserInfoResponse> implements APIRequest<R> {
  method = HTTP_METHOD.GET;
  path: string;
  response!: R;
  auth = true;

  constructor(public authorization: string) {
    this.path = `/user/info`;
  }
}

// 유저 회원가입
export class PostSignUp<R extends SignUpResponse> implements APIRequest<R> {
  method = HTTP_METHOD.POST;
  path: string;
  response!: R;
  auth = false;

  constructor(public data: SignUpRequest) {
    this.path = `/user/signup`;  
  }
}

// 유저 로그인
export class PostLogin implements APIRequest<LoginResponse> {
  method = HTTP_METHOD.POST;
  path = '/swagger-auth/login';
  response!: LoginResponse;
  auth = false;

  constructor(public data: LoginRequest) {}
}

// 유저 비밀번호 수정
export class UpdatePassword implements APIRequest<string> {
  method = HTTP_METHOD.PUT;
  path = '/user/update-password';
  response!: string;
  auth = true;

  constructor(public authorization: string, public data: EditPasswordRequest) {}
}

// 이메일 존재 여부 판단
export class GetFindEmail implements APIRequest<FindEmailResponse> {
  method = HTTP_METHOD.GET;
  path = '/user/find-email';
  response!: FindEmailResponse;
  auth = false;
  params: { email: string };

  constructor(public email: string) {
    this.params = { email };
  }
}

// 유저에게 인증번호 전송
export class PostSendCode implements APIRequest<SendCodeResponse> {
  method = HTTP_METHOD.POST;
  path = '/user/send-code';
  response!: SendCodeResponse;
  auth = false;

  constructor(public data: SendCodeRequest) {}
}


// 인증번호 확인 및 비밀번호 확인
export class PostCheckCode implements APIRequest<CheckCodeResponse> {
  method = HTTP_METHOD.POST;
  path = '/user/check-code';
  response!: CheckCodeResponse;
  auth = false;

  constructor(public data: CheckCodeRequest) {}
}

// 비밀번호 재설정(초기화)
export class PutResetPassword implements APIRequest<ResetPasswordResponse> {
  method = HTTP_METHOD.PUT;
  path = '/user/reset-password';
  response!: ResetPasswordResponse;
  auth = false;

  constructor(public data: ResetPasswordRequest) {}
}