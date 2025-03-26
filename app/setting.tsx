import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import useShowToast from '../hooks/useShowToast';
import { styles } from '@/styles/settingScreenStyles';

function SettingScreen() {
  const router = useRouter();
  const showToast = useShowToast();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    const check = localStorage.getItem('accessToken');
    console.log('✅ accessToken가 null이면 삭제 완료된 거에용~:', check);  
    showToast('success', '로그아웃 완료', '다음에 또 만나요 👋');    
    router.replace('/signIn');
  };

  // 임시 유저 정보 (API 연결 가능)
  const user = {
    name: '홍길동',
    email: 'gildong@email.com',
    phone: '010-1234-5678',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>마이페이지</Text>

      {/* 상단 프로필 */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{user.name}</Text>
            {/* <View style={styles.badge}>
              <Text style={styles.badgeText}>{user.grade}</Text>
            </View> */}
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 회원정보 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>회원정보</Text>
          <TouchableOpacity onPress={() => router.push('/editProfile')}>
            <Text style={styles.editText}>회원정보 수정</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <Text style={styles.infoValue}>{user.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>비밀번호</Text>
          <Text style={styles.infoValue}>********</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이메일</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>연락처</Text>
          <Text style={styles.infoValue}>{user.phone}</Text>
        </View>
      </View>
    </View>
  );
}

export default SettingScreen;
