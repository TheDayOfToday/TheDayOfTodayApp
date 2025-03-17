import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

function SignInScreen() {
  const router = useRouter(); // 라우터 훅
  
  const handleLogin = () => {
    router.replace('/(tabs)');
  };
  const handleSignUp = () => {
    router.push('/signUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 하루</Text>

      <Text style={styles.loginLabel}>로그인</Text>

      <TextInput placeholder="이메일" style={styles.input} />
      <View style={styles.passwordContainer}>
        <TextInput placeholder="비밀번호" secureTextEntry style={styles.inputPassword} />
        <Ionicons name="eye-off-outline" size={20} color="#aaa" />
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
