import type { APIResponse } from '../APIResponse';

// 유저 탈퇴
export interface DeleteUserResponse extends APIResponse {
    message: string;
}

// 유저 정보 조회
export interface UserInfoResponse {
    name: string;
    email: string;
    profileImage: string;
    password: string;
    phoneNumber: string;
}

// 유저 정보 기입
export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}

// 유저 회원가입
export interface SignUpResponse extends APIResponse {
    message: string;
}

// 로그인
export type LoginRequest = {
    email: string;
    password: string;
};

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

// 유저 정보 수정
export interface EditPasswordRequest {
    currentPassword: string;
    newPassword: string;
}

// 이메일 존재 여부 판단
export type FindEmailResponse = string;

// 인증번호 전송
export type SendCodeRequest = {
  email: string;
};

export type SendCodeResponse = string;

// 인증번호 확인 및 비밀번호 확인
export type CheckCodeRequest = {
  email: string;
  code: string;
};

export type CheckCodeResponse = string;

// 비밀번호 재설정(초기화)
export type ResetPasswordRequest = {
  email: string;
  newPassword: string;
};

export type ResetPasswordResponse = string;
