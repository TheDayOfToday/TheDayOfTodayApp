export interface DeleteUserResponse {
  message: string;
}

export interface UserInfoResponse {
  name: string;
  email: string;
  profileImage: string;
  password: string;
  phoneNumber: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface SignUpResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface EditPasswordRequest {
  newPassword: string;
}

export type FindEmailResponse = string;

export interface SendCodeRequest {
  email: string;
}

export type SendCodeResponse = string;

export interface CheckCodeRequest {
  email: string;
  code: string;
}

export type CheckCodeResponse = string;

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export type ResetPasswordResponse = string;
