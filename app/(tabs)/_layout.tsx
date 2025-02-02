import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { layoutStyles } from '../../styles/layoutStyles';

const SettingButton = ({ navigation }: { navigation: any }) => (
  <Text
    style={layoutStyles.settingButton}
    onPress={() => navigation.navigate('setting')}
  >
    <Ionicons name="settings-outline" size={24} color="black" />
  </Text>
);

function TabLayout() {
  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        headerShown: true,
        tabBarStyle: layoutStyles.tabBar,
        tabBarLabelStyle: layoutStyles.tabBarLabel,
        tabBarIconStyle: layoutStyles.tabBarIcon,
        tabBarActiveTintColor: '#030a5e',
        tabBarInactiveTintColor: '#cecfd5',
        headerRight: () => <SettingButton navigation={navigation} />,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: '오늘의 하루',
          headerTitleStyle: layoutStyles.headerTitle,
          title: 'Calendar',
          tabBarIcon: ({ focused, color }) => (
            <AntDesign 
              name="calendar" 
              size={24} 
              color={focused ? '#030a5e' : '#cecfd5'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          headerTitle: '오늘의 하루',
          headerTitleStyle: layoutStyles.headerTitle,
          tabBarLabel: '',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={[
                layoutStyles.recordButtonContainer,
                focused && { backgroundColor: '#030a5e' },
              ]}
            >
              <MaterialIcons 
              name="keyboard-voice" 
              size={32} 
              style={[
                layoutStyles.recordButton,
                focused && { color: '#81a5fa' },
              ]}
            />
            </View>
          ),
        }}
        listeners={({ navigation}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('record', { openBottomSheet: true });
          },
        })}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          headerTitle: '오늘의 하루',
          headerTitleStyle: layoutStyles.headerTitle,
          title: 'Analysis',
          tabBarIcon: ({focused, color }) => (
            <MaterialIcons 
              name="menu-book" 
              size={24} 
              color={focused ? '#030a5e' : '#cecfd5'}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
