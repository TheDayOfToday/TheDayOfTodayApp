import React from 'react';
import { View, Text, Button } from 'react-native';
import { commonStyles } from '../styles/common';
import { useRouter } from 'expo-router';

function SettingScreen() {
  const router = useRouter();

  // 로그인으로 이동
  const handleLogout = () => {
    router.replace('/signIn');
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>설정 화면</Text>
      
      <Button title="로그아웃" onPress={handleLogout} color="red" />
    </View>
  );
}

export default SettingScreen;