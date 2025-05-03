import APIClient from '@/api/apiClient';
import { GetUserInfo, PostSignUp, DeleteUser, PostLogin } from './APIDetail';

export const deleteUser = APIClient.of(DeleteUser);

export const getUserInfo = APIClient.of(GetUserInfo);

export const postSignUp = APIClient.of(PostSignUp);

export const postLogin = APIClient.of(PostLogin);