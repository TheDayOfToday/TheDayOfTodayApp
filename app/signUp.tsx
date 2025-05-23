import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { useSignUp } from '@/hooks/useSignUp';
import { styles } from '@/styles/signUpStyles';
import useShowToast from '@/hooks/useShowToast';
import LoadingScreen from '@/components/Loading';

function SignUpScreen() {
  const { mutate: signUpMutate, isPending } = useSignUp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const showToast = useShowToast();

  const handleSubmit = () => {
    if (!name || !email || !password || !phoneNumber) {
      showToast('error', '입력 오류', '모든 항목을 입력해주세요.');
      return;
    }
    signUpMutate({ name, email, password, phoneNumber });
  };

  return (
    <>
      {isPending ? <LoadingScreen  backgroundColor='#17171E'/> : (
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
            <Pressable style={styles.authButton}>
              <Text style={styles.authText}>인증하기</Text>
            </Pressable>
          </View>
          <TextInput
            placeholder="비밀번호"
            placeholderTextColor="#69728F"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
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
