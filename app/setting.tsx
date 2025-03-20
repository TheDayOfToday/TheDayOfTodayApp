import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default SettingScreen;
