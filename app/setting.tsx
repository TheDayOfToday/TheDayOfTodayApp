import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/common';
import { useRouter } from 'expo-router';
import { settingScreenStyles } from '@/styles/settingScreenStyles';

function SettingScreen() {
  const router = useRouter();

  // 로그인으로 이동
  const handleLogout = () => {
    router.replace('/signIn');
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>마이페이지</Text>      
      <TouchableOpacity style={settingScreenStyles.logoutButton} onPress={handleLogout}>
        <Text style={settingScreenStyles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SettingScreen;
