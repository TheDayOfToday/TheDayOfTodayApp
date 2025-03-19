import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

function SignUpScreen() {
  const router = useRouter();
    
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const handleSubmit = async () => {
    const userData = {      
      name,
      email,
      password,
      phoneNumber,
    };
  
    if (!name || !email || !password || !phoneNumber) {
      window.alert('모든 항목을 입력해주세요.');
      return;
    }
  
    try {
      const response = await fetch('https://thedayoftoday.kro.kr/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': '*/*' },        
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {             
        window.alert('회원가입이 완료되었습니다!');
        router.replace('/signIn'); 
      } else {        
        window.alert('회원가입 실패. 다시 시도해주세요.');
      }
    } catch (error) {      
      window.alert('서버 연결 실패');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>오늘의 하루 - 회원가입</Text>
      
      <TextInput
        placeholder="이름"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="이메일"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="비밀번호"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="전화번호"
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />      

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>가입하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#001D6E' },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default SignUpScreen;
