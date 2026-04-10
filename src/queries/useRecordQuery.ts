import { useMutation } from '@tanstack/react-query';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

import useShowToast from '@/src/hooks/useShowToast';
import useToken from '@/src/hooks/useToken';
import { postStartConversation } from '@/src/service/record';

export const usePostMonologue = () => {
  const token = useToken();
  const showToast = useShowToast();

  const { mutate, data, isSuccess, isPending } = useMutation({
    mutationFn: async (audioUri: string) => {
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

  return { mutate, data, isSuccess, isPending };
};

export const useConversationStart = () => {
  const showToast = useShowToast();

  const { mutateAsync, data, isSuccess } = useMutation({
    mutationFn: async (token: string) => postStartConversation(token),
    onError: () => showToast('error', '일기 시도 실패', '대화 모드를 시작하지 못하였습니다.'),
  });

  return { mutateAsync, data, isSuccess };
};

export const useConversationQuestion = () => {
  const showToast = useShowToast();

  const { mutateAsync, data, isSuccess, isPending } = useMutation({
    mutationFn: async ({
      token,
      question,
      diaryId,
      audioUri,
    }: {
      token: string;
      question: string;
      diaryId: number;
      audioUri: string;
    }) => {
      const uploadUrl =
        Constants.expoConfig?.extra?.API_BASE_URL +
        `/diary/conversation-mode/next-question?question=${question}&diaryId=${diaryId}`;
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
    },
    onError: () => {
      showToast('error', '대화 실패', '대화 모드 서비스에 오류가 발생하였습니다.');
    },
  });

  return { mutateAsync, data, isSuccess, isPending };
};

export const useConversationEnd = () => {
  const showToast = useShowToast();

  const { mutateAsync, data, isSuccess, isPending } = useMutation({
    mutationFn: async ({
      token,
      question,
      diaryId,
      audioUri,
    }: {
      token: string;
      question: string;
      diaryId: number;
      audioUri?: string;
    }) => {
      const uploadUrl =
        Constants.expoConfig?.extra?.API_BASE_URL +
        `/diary/conversation-mode/complete?question=${question}&diaryId=${diaryId}`;

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
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`대화 실패: ${response.status}`);
        }

        return await response.json();
      }
    },
    onError: () => {
      showToast('error', '대화 종료 실패', '대화 모드 종료에 오류가 발생하였습니다.');
    },
  });

  return { mutateAsync, data, isSuccess, isPending };
};
