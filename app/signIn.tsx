import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useSignIn } from '../hooks/useSignIn';
import useShowToast from '@/hooks/useShowToast';
import useDoubleBackExit from '@/hooks/useDoubleBackExit';
import { styles } from '@/styles/signInStyles';

function SignInScreen() {
  const { login, goToSignUp, loading } = useSignIn();
  const [autoLogin, setAutoLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [passwordVisible, setPasswordVisible] = useState(false);

  const showToast = useShowToast();
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
        <Text style={styles.loginButtonText}>Login</Text>
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
