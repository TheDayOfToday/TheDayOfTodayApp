import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import useShowToast from '../hooks/useShowToast';
import { styles } from '@/styles/editProfileStyles';

const EditProfile = () => {
  const router = useRouter();
  const showToast = useShowToast();

  // 하드코딩
  const [name, setName] = useState('홍길동');
  const [email, setEmail] = useState('gildong@email.com');
  const [phone, setPhone] = useState('010-1234-5678');

  const handleSave = () => {    
    showToast('success', '회원정보가 수정되었습니다.', '로그인 페이지로 돌아갑니다.');
    router.push('/signIn')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>회원정보 수정</Text>

      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>이메일</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>연락처</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

