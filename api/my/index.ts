import APIClient from '@/api/apiClient';
import { GetUserInfo, PostSignUp, DeleteUser } from './APIDetail';

export const deleteUser = APIClient.of(DeleteUser);

export const getUserInfo = APIClient.of(GetUserInfo);

export const postSignUp = APIClient.of(PostSignUp);
