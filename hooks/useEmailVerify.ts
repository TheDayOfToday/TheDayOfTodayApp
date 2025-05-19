import { useMutation } from '@tanstack/react-query';
import { getFindEmail, postSendCode, postCheckCode, putResetPassword } from '@/api/my';

export const useFindEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => await getFindEmail(email),
  });
};

// 인증번호 전송
export const useSendCode = () => {
  return useMutation({
    mutationFn: async (email: string) => await postSendCode({ email }),
  });
};

// 인증번호 확인
export const useCheckCode = () => {
  return useMutation({
    mutationFn: async ({ email, code }: { email: string; code: string }) =>
      await postCheckCode({ email, code }),
  });
};

// 비밀번호 초기화
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ email, newPassword }: { email: string; newPassword: string }) =>
      await putResetPassword({ email, newPassword }),
  });
};
