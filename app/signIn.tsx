import { View, Text, TextInput, TouchableOpacity, Switch, ActivityIndicator, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useSignIn } from '../hooks/useSignIn';
import useShowToast from '@/hooks/useShowToast';
import useDoubleBackExit from '@/hooks/useDoubleBackExit';
import { styles } from '@/styles/signInStyles';
import { useFindEmail, useSendCode, useCheckCode, useResetPassword } from '@/hooks/useEmailVerify';

function SignInScreen() {
  const { login, goToSignUp, loading } = useSignIn();
  const showToast = useShowToast();
  const [autoLogin, setAutoLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const handleLogin = () => {
    if (!email || !password) {
      showToast('error', '입력 오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      showToast('error', '이메일 오류', '유효한 이메일 형식을 입력해주세요.');
      return;
    }
    login(email, password, autoLogin);
  };

  // find-email 로 이메일 존재 여부 판단 후 send-code 로 인증번호 전송하는 부분
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
      onError: (err) => {
        showToast('error', '존재하지 않는 이메일', "존재하지 않는 이메일 주소입니다.");
      },
    });
  };

  // check-code 로 이메일로 전송된 인증번호 확인하는 부분
  const handleResetCodeCheck = () => {
    if (!resetCode.trim()) {
      showToast('error', '입력 필요', '인증코드를 입력해주세요.');
      return;
    }
    checkCodeMutation.mutate({ email: resetEmail, code: resetCode }, {
      onSuccess: () => {
        showToast('success', '인증 성공', '새 비밀번호를 입력해주세요.');
        setCodeChecked(true);
      },
      onError: (err) => {
        showToast('error', '인증 실패', err.message);
      },
    });
  };

  // reset-password 로 비밀번호 변경하는 부분
  const handleResetPassword = () => {
    if (!resetNewPassword.trim()) {
      showToast('error', '입력 없음', '새 비밀번호를 입력해주세요.');
      return;
    }
    resetPasswordMutation.mutate({ email: resetEmail, newPassword: resetNewPassword }, {
      onSuccess: () => {
        showToast('success', '완료', '비밀번호가 변경되었습니다.');
        setResetModalVisible(false);
        setResetEmail('');
        setResetCode('');
        setResetNewPassword('');
        setEmailChecked(false);
        setCodeChecked(false);
      },
      onError: (err) => {
        showToast('error', '오류', err.message); // 여기 에러 메시지 수정 필요함!!!!!!!!!!!!!
      },
    });
  };

  useDoubleBackExit(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 하루</Text>
      <Text style={styles.loginLabel}>로그인</Text>

      <TextInput
        placeholder="이메일"
        placeholderTextColor="#69728F"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="비밀번호"
          placeholderTextColor="#69728F"
          style={styles.inputPassword}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons 
            name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} 
            size={20} 
            color="#D6DEFD" 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Login</Text>}
      </TouchableOpacity>

      <View style={styles.bottomRowContainer}>
        <View style={styles.autoLoginContainer}>
          <Text style={styles.autoLoginLabel}>자동 로그인</Text>
          <Switch
            value={autoLogin}
            onValueChange={setAutoLogin}
            trackColor={{ false: '#f4f3f4', true: '#007AFF' }}
            thumbColor={autoLogin ? '#007AFF' : '#f4f3f4'} 
            style={styles.autoLoginSwitch}
          />
        </View>
        <TouchableOpacity onPress={() => setResetModalVisible(true)}>
          <Text style={styles.resetText}>비밀번호 초기화</Text>
        </TouchableOpacity>        
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpLabelText}>회원이 아니신가요? </Text>
        <TouchableOpacity onPress={goToSignUp}>
          <Text style={styles.signUpText}>회원가입하기</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={resetModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>비밀번호 초기화</Text>

            <TextInput
              placeholder="이메일 입력"
              placeholderTextColor="#69728F"
              style={styles.modalInput}
              value={resetEmail}
              onChangeText={setResetEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.modalButton} onPress={handleResetEmailCheck}>
              <Text style={styles.modalButtonText}>이메일 확인</Text>
            </TouchableOpacity>

            {emailChecked && (
              <>
                <TextInput
                  placeholder="인증번호 입력"
                  placeholderTextColor="#69728F"
                  style={styles.modalInput}
                  value={resetCode}
                  onChangeText={setResetCode}
                  keyboardType="numeric"
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleResetCodeCheck}>
                  <Text style={styles.modalButtonText}>코드 확인</Text>
                </TouchableOpacity>
              </>
            )}

            {codeChecked && (
              <>
                <TextInput
                  placeholder="새 비밀번호 입력"
                  placeholderTextColor="#69728F"
                  style={styles.modalInput}
                  value={resetNewPassword}
                  onChangeText={setResetNewPassword}
                  secureTextEntry
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleResetPassword}>
                  <Text style={styles.modalButtonText}>비밀번호 변경</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity onPress={() => setResetModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default SignInScreen;
