import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import useShowToast from '../hooks/useShowToast';
import { styles } from '@/styles/editProfileStyles';

const EditPassword = () => {
  const router = useRouter();
  const showToast = useShowToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      showToast('error', '비밀번호 불일치', '새 비밀번호가 일치하지 않습니다.');
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      showToast('error', '인증 오류', '다시 로그인해주세요.');
      return;
    }

    try {
      const response = await fetch('https://thedayoftoday.kro.kr/user/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '비밀번호 변경 실패');
      }

      showToast('success', '비밀번호 변경 완료', '다시 로그인해주세요.');
      router.replace('/signIn');
    } catch (error: any) {
      showToast('error', '에러 발생', error.message);
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
