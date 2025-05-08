import Constants from 'expo-constants';
import { useMutation } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';
import useShowToast from '@/hooks/useShowToast';

interface ConversationQuestionProps {
  token: string;
  question: string;
  diaryId: number;
  audioUri: string;
}

const useConversationQuestion = () => {
  const showToast = useShowToast();

  const { mutateAsync, data, isSuccess, isPending } = useMutation({
    mutationFn: async ({
      token,
      question,
      diaryId,
      audioUri
    }: ConversationQuestionProps) => {
      const uploadUrl = Constants.expoConfig?.extra?.API_BASE_URL + `/diary/conversation-mode/next-question?question=${question}&diaryId=${diaryId}`;
      const result = await FileSystem.uploadAsync(uploadUrl, audioUri, {
        fieldName: 'file',
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if(result.status !== 200 && result.status !== 201) {
        throw new Error('대화 실패: &{result.status}');
      }

      return JSON.parse(result.body);
    },
    onError: () => {
      showToast('error', '대화 실패', '대화 모드 서비스에 오류가 발생하였습니다.');
    }
  });

  return {
    mutateAsync,
    data,
    isSuccess,
    isPending,
  }
}

export default useConversationQuestion;
