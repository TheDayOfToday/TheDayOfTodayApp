import type { APIResponse } from '../responseType';

export interface DeleteUserResponse extends APIResponse {
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

export interface SignUpResponse extends APIResponse {
  message: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface EditPasswordRequest {
  newPassword: string;
}

export type FindEmailResponse = string;

export type SendCodeRequest = {
  email: string;
};

export type SendCodeResponse = string;

export type CheckCodeRequest = {
  email: string;
  code: string;
};

export type CheckCodeResponse = string;

export type ResetPasswordRequest = {
  email: string;
  newPassword: string;
};

export type ResetPasswordResponse = string;
