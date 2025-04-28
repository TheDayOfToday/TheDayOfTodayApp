import Constants from 'expo-constants';
import { useMutation } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';
import useShowToast from '@/hooks/useShowToast';
import useToken from './useToken';

const useMonologue = () => {
  const token  = useToken();
  const showToast = useShowToast();

  return useMutation({
    mutationFn: async (audioUri: string) => {

      if (!token) { // 임시 처리
        throw new Error('토큰이 없습니다.');
      }

      const uploadUrl = Constants.expoConfig?.extra?.API_BASE_URL + '/diary/monologue';
      const result = await FileSystem.uploadAsync(uploadUrl, audioUri, {
        fieldName: 'file',
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (result.status !== 200 && result.status !== 201) {
        throw new Error(`업로드 실패: ${result.status}`);
      }

      return JSON.parse(result.body);
    },
    onError: () => {
      showToast('error', '업로드 실패', '일기 업로드에 실패했습니다.');
    },
  });
};

export default useMonologue;
