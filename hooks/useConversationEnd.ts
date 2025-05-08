import Constants from 'expo-constants';
import { useMutation } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';
import useShowToast from '@/hooks/useShowToast';

interface ConversationEndProps {
  token: string;
  question: string;
  diaryId: number;
  audioUri?: string;
}

const useConversationEnd = () => {
  const showToast = useShowToast();

  const { mutateAsync, data, isSuccess, isPending } = useMutation({
    mutationFn: async ({
      token,
      question,
      diaryId,
      audioUri,
    }: ConversationEndProps) => {
      const uploadUrl = Constants.expoConfig?.extra?.API_BASE_URL + `/diary/conversation-mode/complete?question=${question}&diaryId=${diaryId}`;
            
      if (audioUri) {
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
          throw new Error(`대화 실패: ${result.status}`);
        }

        return JSON.parse(result.body);
      } else {
        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`대화 실패: ${response.status}`);
        }

        return await response.json();
      }
    },
    onError: () => {
      showToast('error', '대화 종료 실패', '대화 모드 종료에 오류가 발생하였습니다.')
    }
  });

  return {
    mutateAsync,
    data,
    isSuccess,
    isPending,
  }
}

export default useConversationEnd;
