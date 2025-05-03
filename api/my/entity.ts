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
    success: boolean;
}
