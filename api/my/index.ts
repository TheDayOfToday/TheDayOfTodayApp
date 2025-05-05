import APIClient from '@/api/apiClient';
import { GetUserInfo } from './APIDetail';

export const getUserInfo = APIClient.of(GetUserInfo);
