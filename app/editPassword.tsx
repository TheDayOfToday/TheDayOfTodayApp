import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import useShowToast from '../hooks/useShowToast';
import { styles } from '@/styles/editProfileStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditPassword = () => {
  const router = useRouter();
  const showToast = useShowToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async () => {
    console.log('비밀번호 버튼 누름');
  
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

    const token = AsyncStorage.getItem('accessToken');
    if (!token) {
      showToast('error', '인증 오류', '다시 로그인해주세요.');
      return;
    }

    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>비밀번호 변경</Text>

      <Text style={styles.label}>현재 비밀번호</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <Text style={styles.label}>새 비밀번호</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Text style={styles.label}>새 비밀번호 확인</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handlePasswordChange}>
        <Text style={styles.saveButtonText}>변경하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditPassword;
