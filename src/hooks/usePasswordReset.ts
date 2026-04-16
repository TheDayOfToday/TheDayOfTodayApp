import { useState } from 'react';

import useShowToast from '@/src/hooks/useShowToast';
import { useFindEmail, useSendCode, useCheckCode, useResetPassword } from '@/src/queries/useAuthQuery';

export const usePasswordReset = () => {
  const showToast = useShowToast();

  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [codeChecked, setCodeChecked] = useState(false);

  const findEmailMutation = useFindEmail();
  const sendCodeMutation = useSendCode();
  const checkCodeMutation = useCheckCode();
  const resetPasswordMutation = useResetPassword();

  const openResetModal = () => setResetModalVisible(true);
  const closeResetModal = () => setResetModalVisible(false);

  const handleResetEmailCheck = () => {
    if (!resetEmail.trim()) {
      showToast('error', '입력 오류', '이메일을 입력해주세요.');
      return;
    }
    findEmailMutation.mutate(resetEmail, {
      onSuccess: () => {
        showToast('success', '이메일 확인', '해당 이메일로 인증코드를 전송했습니다.');
        setEmailChecked(true);
        sendCodeMutation.mutate(resetEmail);
      },
      onError: () => {
        showToast('error', '존재하지 않는 이메일', '존재하지 않는 이메일 주소입니다.');
      },
    });
  };

  const handleResetCodeCheck = () => {
    if (!resetCode.trim()) {
      showToast('error', '입력 필요', '인증코드를 입력해주세요.');
      return;
    }
    checkCodeMutation.mutate(
      { email: resetEmail, code: resetCode },
      {
        onSuccess: () => {
          showToast('success', '인증 성공', '새 비밀번호를 입력해주세요.');
          setCodeChecked(true);
        },
        onError: () => {
          showToast('error', '인증번호 불일치', '인증번호가 일치하지 않습니다.');
        },
      },
    );
  };

  const handleResetPassword = () => {
    if (!resetNewPassword.trim()) {
      showToast('error', '입력 없음', '새 비밀번호를 입력해주세요.');
      return;
    }
    resetPasswordMutation.mutate(
      { email: resetEmail, newPassword: resetNewPassword },
      {
        onSuccess: () => {
          showToast('success', '완료', '비밀번호가 변경되었습니다.');
          setResetModalVisible(false);
          setResetEmail('');
          setResetCode('');
          setResetNewPassword('');
          setEmailChecked(false);
          setCodeChecked(false);
        },
        onError: () => {
          showToast('error', '비밀번호 재설정', '기존 비밀번호와 일치합니다.');
        },
      },
    );
  };

  return {
    resetModalVisible,
    resetEmail,
    setResetEmail,
    resetCode,
    setResetCode,
    resetNewPassword,
    setResetNewPassword,
    emailChecked,
    codeChecked,
    openResetModal,
    closeResetModal,
    handleResetEmailCheck,
    handleResetCodeCheck,
    handleResetPassword,
  };
};
