import axios from 'axios';
import Constants from 'expo-constants';

const apiClient = axios.create({
  baseURL: Constants.expoConfig?.extra?.API_BASE_URL,
  timeout: 10000,
});

export default apiClient;

export const authHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});
