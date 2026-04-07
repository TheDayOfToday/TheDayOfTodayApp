import React, { useState } from 'react';
import { View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import useShowToast from '@/src/hooks/useShowToast';
import { styles } from '@/src/styles/editProfileStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatePassword } from '@/src/service/auth';

const EditPassword = () => {
  const router = useRouter();
  const showToast = useShowToast();  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async () => {
    if (!newPassword.trim()) {
      showToast('error', '입력 필요', '새 비밀번호를 입력해주세요.');
      return;
    }
  
    if (!confirmPassword.trim()) {
      showToast('error', '입력 필요', '비밀번호 확인란을 입력해주세요.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      showToast('error', '비밀번호 불일치', '새 비밀번호가 일치하지 않습니다.');
      return;
    }
  
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      showToast('error', '인증 오류', '다시 로그인해주세요.');
      return;
    }
  
    try {
      const result = await updatePassword(token, { newPassword });
      console.log(result);   
      showToast('success', '비밀번호 변경 완료', '다시 로그인해주세요.');
      router.replace('/signIn');
    } catch (error: any) {      
      showToast('error', '비밀번호 변경 실패', '기존 비밀번호와 같습니다.');
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>비밀번호 변경</Text>
          </View>
          <View style={styles.contentContainer}>            
            <View>
              <Text style={styles.label}>새 비밀번호</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </View>
            <View>
              <Text style={styles.label}>새 비밀번호 확인</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>
          <View>
            <Pressable style={styles.saveButton} onPress={handlePasswordChange}>
              <Text style={styles.saveButtonText}>변경하기</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditPassword;
