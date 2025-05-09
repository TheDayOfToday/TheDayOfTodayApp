// import Constants from 'expo-constants';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { PostStayLogIn } from './my/APIDetail';
// import APIClient from './apiClient';

// const api = axios.create({
//   baseURL: Constants.expoConfig?.extra?.API_BASE_URL,
//   withCredentials: true,
// });

// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   res => res,
//   async error => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       error.response?.data === 'access token expired' &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = await AsyncStorage.getItem('refreshToken');
//         const stayLoggedIn = APIClient.of(PostStayLogIn);
//         const res = await stayLoggedIn(refreshToken);
//         const newAccessToken = res?.accessToken;

//         if (!newAccessToken) throw new Error('No new accessToken');

//         await AsyncStorage.setItem('accessToken', newAccessToken);
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (err) {
//         await AsyncStorage.clear();
//         window.location.href = '/login'; // 또는 navigation.navigate('SignIn');
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
