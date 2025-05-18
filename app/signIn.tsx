import { View, Text, TextInput, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useSignIn } from '../hooks/useSignIn';
import useShowToast from '@/hooks/useShowToast';
import useDoubleBackExit from '@/hooks/useDoubleBackExit';
import { styles } from '@/styles/signInStyles';
import { useFindEmail, useSendCode, useCheckCode } from '@/hooks/useEmailVerify';

function SignInScreen() {
  const { login, goToSignUp, loading } = useSignIn();
  const showToast = useShowToast();
  const [autoLogin, setAutoLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [emailVerified, setEmailVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');

  const findEmailMutation = useFindEmail();
  const sendCodeMutation = useSendCode();
  const checkCodeMutation = useCheckCode();

  const handleEmailVerify = () => {
    if (!email) {
      showToast('error', '입력 오류', '이메일을 입력해주세요.');
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      showToast('error', '형식 오류', '유효한 이메일 형식을 입력하세요.');
      return;
    }
    findEmailMutation.mutate(email, {
      onSuccess: (res) => {
        showToast('success', '확인 완료', res);
        setEmailVerified(true);
        sendCodeMutation.mutate(email, {
          onSuccess: (res) => {
            showToast('success', '인증코드 발송', res);
            setCodeSent(true);
          },
        });
      },
      onError: (err: any) => {
        showToast('error', '이메일 없음', err.message);
      },
    });
  };

  const handleCodeCheck = () => {
    if (!code) {
      showToast('error', '입력 오류', '인증코드를 입력해주세요.');
      return;
    }
    checkCodeMutation.mutate({ email, code }, {
      onSuccess: (res) => {
        showToast('success', '인증 완료', res);
        setEmailVerified(true);
      },
      onError: (err: any) => {
        showToast('error', '인증 실패', err.message);
      },
    });
  };

  const handleLogin = () => {
    if (!email || !password) {
      showToast('error', '입력 오류', '이메일과 비밀번호를 모두 입력하세요.');
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      showToast('error', '이메일 오류', '유효한 이메일 형식을 입력하세요.');
      return;
    }
    login(email, password, autoLogin);
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

      <TouchableOpacity style={styles.emailCheckButton} onPress={handleEmailVerify}>
        <Text style={styles.emailCheckButtonText}>이메일 확인</Text>
      </TouchableOpacity>

      {codeSent && (
        <View style={styles.verificationContainer}>
          <TextInput
            placeholder="인증코드 입력"
            placeholderTextColor="#69728F"
            style={styles.input}
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.verifyButton} onPress={handleCodeCheck}>
            <Text style={styles.verifyButtonText}>인증 확인</Text>
          </TouchableOpacity>
        </View>
      )}

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

      <View style={styles.autoLoginContainer}>
        <Text style={styles.autoLoginLabel}>자동 로그인</Text>
        <Switch
          value={autoLogin}
          onValueChange={setAutoLogin}
          trackColor={{ false: '#ccc', true: '#84b9ff' }}
          thumbColor={autoLogin ? '#007AFF' : '#f4f3f4'}
        />
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpLabelText}>회원이 아니신가요? </Text>
        <TouchableOpacity onPress={goToSignUp}>
          <Text style={styles.signUpText}>회원가입하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignInScreen;