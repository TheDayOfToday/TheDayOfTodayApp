import apiClient, { authHeader } from '../index';

import type {
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

export const deleteUser = async (token: string) => {
  const { data } = await apiClient.delete<DeleteUserResponse>('/user/delete', {
    headers: authHeader(token),
  });
  return data;
};

export const getUserInfo = async (token: string) => {
  const { data } = await apiClient.get<UserInfoResponse>('/user/info', {
    headers: authHeader(token),
  });
  return data;
};

export const postSignUp = async (body: SignUpRequest) => {
  const { data } = await apiClient.post<SignUpResponse>('/user/signup', body);
  return data;
};

export const postLogin = async (body: LoginRequest) => {
  const { data } = await apiClient.post<LoginResponse>('/swagger-auth/login', body);
  return data;
};

export const updatePassword = async (token: string, body: EditPasswordRequest) => {
  const { data } = await apiClient.put<string>('/user/update-password', body, {
    headers: authHeader(token),
  });
  return data;
};

export const getFindEmail = async (email: string) => {
  const { data } = await apiClient.get<FindEmailResponse>('/user/find-email', {
    params: { email },
  });
  return data;
};

export const postSendCode = async (body: SendCodeRequest) => {
  const { data } = await apiClient.post<SendCodeResponse>('/user/send-code', body);
  return data;
};

export const postCheckCode = async (body: CheckCodeRequest) => {
  const { data } = await apiClient.post<CheckCodeResponse>('/user/check-code', body);
  return data;
};

export const putResetPassword = async (body: ResetPasswordRequest) => {
  const { data } = await apiClient.put<ResetPasswordResponse>('/user/reset-password', body);
  return data;
};
