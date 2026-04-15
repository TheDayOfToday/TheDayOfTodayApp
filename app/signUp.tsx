import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';

import { LoadingScreen } from '@/src/components/common/Loading';
import useShowToast from '@/src/hooks/useShowToast';
import { useSignUp } from '@/src/hooks/useSignUp';
import { useSendCode, useCheckCode } from '@/src/queries/useAuthQuery';
import { styles } from '@/src/styles/signUpStyles';

function SignUpScreen() {
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
    onError: (_err) => {
      showToast('error', '전송 실패', '인증번호 전송 실패');
    },
  });
};

  const handleCheckCode = () => {
    checkCodeMutation.mutate({ email, code: emailCode }, {
      onSuccess: () => {
        showToast('success', '인증 완료', '이메일 인증이 완료되었습니다.');
        setEmailVerified(true);
      },
      onError: (_err) => {
        showToast('error', '인증 실패', '인증번호가 일치하지 않습니다.');
      },
    });
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

  return (
    <>
      {isPending ? <LoadingScreen backgroundColor='#17171E'/> : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>오늘의 하루</Text>
          <Text style={styles.signUpLabel}>회원가입</Text>

          <TextInput
            placeholder="이름"
            placeholderTextColor="#69728F"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <View style={styles.emailContainer}>
            <TextInput
              placeholder="이메일"
              placeholderTextColor="#69728F"
              style={styles.inputEmail}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Pressable style={styles.authButton} onPress={handleSendCode}>
              <Text style={styles.authText}>인증하기</Text>
            </Pressable>
          </View>

          {emailSent && (
            <View style={styles.emailContainer}>
              <TextInput
                placeholder="인증번호 입력"
                placeholderTextColor="#69728F"
                style={styles.inputEmail}
                value={emailCode}
                onChangeText={setEmailCode}
                keyboardType="numeric"
              />
              <Pressable style={styles.authButton} onPress={handleCheckCode}>
                <Text style={styles.authText}>코드 확인</Text>
              </Pressable>
            </View>
          )}

          <TextInput
            placeholder="비밀번호"
            placeholderTextColor="#69728F"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={emailVerified}
          />

          <TextInput
            placeholder="전화번호"
            placeholderTextColor="#69728F"
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>가입하기</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
}

export default SignUpScreen;
