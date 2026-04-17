import { useState } from 'react';

import useShowToast from '@/src/hooks/useShowToast';
import { useSignUp } from '@/src/hooks/useSignUp';
import { useSendCode, useCheckCode } from '@/src/queries/useAuthQuery';

export const useEmailVerification = () => {
  const { mutate: signUpMutate, isPending } = useSignUp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [emailSent, setEmailSent] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  const sendCodeMutation = useSendCode();
  const checkCodeMutation = useCheckCode();

  const showToast = useShowToast();

  const handleSendCode = () => {
    if (!email.trim()) {
      showToast('error', '입력 오류', '이메일을 입력해주세요.');
      return;
    }

    setEmailSent(true);

    sendCodeMutation.mutate(email, {
      onSuccess: () => {
        showToast('success', '전송 완료', '입력한 이메일로 인증번호가 전송되었습니다.');
      },
      onError: () => {
        showToast('error', '전송 실패', '인증번호 전송 실패');
      },
    });
  };

  const handleCheckCode = () => {
    checkCodeMutation.mutate(
      { email, code: emailCode },
      {
        onSuccess: () => {
          showToast('success', '인증 완료', '이메일 인증이 완료되었습니다.');
          setEmailVerified(true);
        },
        onError: () => {
          showToast('error', '인증 실패', '인증번호가 일치하지 않습니다.');
        },
      },
    );
  };

  const handleSubmit = () => {
    if (!name || !email || !password || !phoneNumber) {
      showToast('error', '입력 오류', '모든 항목을 입력해주세요.');
      return;
    }
    if (!emailVerified) {
      showToast('error', '인증 오류', '이메일 인증을 완료해주세요.');
      return;
    }
    signUpMutate({ name, email, password, phoneNumber });
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text.replace(/[^0-9]/g, ''));
  };

  return {
    isPending,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    handlePhoneNumberChange,
    emailSent,
    emailCode,
    setEmailCode,
    emailVerified,
    handleSendCode,
    handleCheckCode,
    handleSubmit,
  };
};
