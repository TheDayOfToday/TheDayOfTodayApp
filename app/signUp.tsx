import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useSignUp } from '@/hooks/useSignUp';
import { styles } from '@/styles/signUpStyles';

function SignUpScreen() {  
  const { signUp } = useSignUp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    signUp({ name, email, password, phoneNumber });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>오늘의 하루</Text>
      <Text style={styles.signUpLabel}>회원가입</Text>  
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

export default SignUpScreen;
