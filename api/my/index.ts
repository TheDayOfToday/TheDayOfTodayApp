import APIClient from '@/api/apiClient';
import { 
    GetUserInfo, 
    PostSignUp, 
    DeleteUser, 
    PostLogin, 
    UpdatePassword, 
    GetFindEmail,
    PostSendCode,
    PostCheckCode,
    PutResetPassword, } from './APIDetail';

export const deleteUser = APIClient.of(DeleteUser);

export const getUserInfo = APIClient.of(GetUserInfo);

export const postSignUp = APIClient.of(PostSignUp);

export const postLogin = APIClient.of(PostLogin);

export const updatePassword = APIClient.of(UpdatePassword);

export const getFindEmail = APIClient.of(GetFindEmail);

export const postSendCode = APIClient.of(PostSendCode);

export const postCheckCode = APIClient.of(PostCheckCode);

export const putResetPassword = APIClient.of(PutResetPassword);
