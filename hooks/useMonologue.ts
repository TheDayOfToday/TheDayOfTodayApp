import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postEndMonologue } from '../api/record';
import useShowToast from '@/hooks/useShowToast';
import useToken from './useToken';

const useMonologue = () => {
  const token  = useToken();
  const showToast = useShowToast();

  return useMutation({
    mutationFn: async (audioUri: string) => {
      // 임시 처리
      if (!token) {
        throw new Error('토큰이 없습니다.');
      }
      const formData = new FormData();
      formData.append('file', {
        uri: audioUri,
        name: 'monologue.wav',
        type: 'audio/wav',
      } as any);
      return postEndMonologue(token, formData);
    },
    onError: () => {
      showToast('error', '업로드 실패', '일기 업로드에 실패했습니다.');
    },
  });
};

export default useMonologue;
