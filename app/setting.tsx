import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/common';

const SettingScreen = () => {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>설정 화면</Text>
    </View>
  );
};

export default SettingScreen;
