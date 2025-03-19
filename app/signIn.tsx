import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      window.alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('https://thedayoftoday.kro.kr/signup', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': '*/*' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {            
        router.replace('/(tabs)');
      } else {        
        window.alert('이메일 또는 비밀번호를 확인해주세요.');
      }
    } catch (error) {           
      window.alert('서버와의 연결에 실패했습니다.');
    }
  };

  const handleSignUp = () => {
    router.push('/signUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 하루</Text>

      <Text style={styles.loginLabel}>로그인</Text>

      <TextInput
        placeholder="이메일"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="비밀번호"
          style={styles.inputPassword}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons 
            name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} 
            size={20} 
            color="#aaa" 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text>회원이 아니신가요? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signUpText}>회원가입하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#001D6E', marginBottom: 30 },
  loginLabel: { alignSelf: 'flex-start', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, paddingHorizontal: 15, marginBottom: 10 },
  passwordContainer: { width: '100%', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, paddingHorizontal: 15, marginBottom: 10 },
  inputPassword: { flex: 1, height: 50 },  
  loginButton: { width: '100%', height: 50, backgroundColor: '#007BFF', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  loginButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  signUpContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  signUpText: { color: '#007BFF', fontWeight: 'bold' },
});

export default SignInScreen;
