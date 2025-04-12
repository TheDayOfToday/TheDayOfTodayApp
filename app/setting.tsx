import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import useShowToast from '../hooks/useShowToast';
import { styles } from '@/styles/settingScreenStyles';

function SettingScreen() {
  const router = useRouter();
  const showToast = useShowToast();

  // 서버에서 받아올 유저 정보 state
  const [user, setUser] = useState({
    name: '',
    email: '',    
    profileImage: '',
    phoneNumber: '',
  });

  // 전화번호 포맷팅 함수
  // 010-1234-5678 형태로 변환
  const formatPhoneNumber = (number: string) => {
    if (!number) return '';
    return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  // 마이페이지 진입 시 유저 정보 API 호출
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('accessToken');
      console.log('getItem token: ', token);
      if (!token) {
        console.warn('토큰이 없음');
        return;
      }

      try {
        const response = await fetch('https://thedayoftoday.kro.kr/user/info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });        

        if (!response.ok) {
          throw new Error('유저 정보 불러오기 실패');
        }

        const data = await response.json();
        console.log('유저 정보:', data);
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    console.log('accessToken 삭제 완료');
    showToast('success', '로그아웃 완료', '다음에 또 만나요 👋');
    router.replace('/signIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>마이페이지</Text>

      {/* 상단 프로필 */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} style={styles.profileImage} />
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{user.name}</Text>
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
          <TouchableOpacity onPress={() => router.push('/editPassword')}>
            <Text style={styles.editText}>비밀번호 수정</Text>            
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <Text style={styles.infoValue}>{user.name}</Text>
        </View>        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이메일</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>전화번호</Text>
          <Text style={styles.infoValue}>{formatPhoneNumber(user.phoneNumber)}</Text>
        </View>       
      </View>
    </View>
  );
}

export default SettingScreen;
