import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs, usePathname } from 'expo-router';
import { Text, View } from 'react-native';
import { layoutStyles } from '../../styles/layoutStyles';

function TabLayout() {
  const SettingButton = ({ navigation }: { navigation: any }) => (
    <Text
      style={layoutStyles.settingButton}
      onPress={() => navigation.navigate('setting')}
    >
      <Ionicons
        name="settings-outline"
        size={24}
        color={isRecording ? 'white' : 'black'}
      />
    </Text>
  );

  const pathname = usePathname();
  const isRecording = pathname === "/recording/conversation" || pathname === "/recording/monologue";

  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        headerShown: isRecording ? false : true,
        headerTitle: '오늘의 하루',
        headerTitleStyle: layoutStyles.headerTitle,
        headerRight: () => <SettingButton navigation={navigation} />,
        tabBarStyle: layoutStyles.tabBar,
        tabBarLabelStyle: layoutStyles.tabBarLabel,
        tabBarIconStyle: layoutStyles.tabBarIcon,
        tabBarActiveTintColor: '#0e0c26',
        tabBarInactiveTintColor: '#cecfd5',
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ focused, color }) => (
            <AntDesign 
              name="calendar" 
              size={24} 
              color={focused ? '#0e0c26' : '#cecfd5'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recording"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color }) => (
            <View
              style={[
                layoutStyles.recordButtonContainer,
                focused && { backgroundColor: '#fff' },
              ]}
            >
              <MaterialIcons 
              name="keyboard-voice" 
              size={32} 
              style={[
                layoutStyles.recordButton,
                focused && { color: '#0e0c26' },
              ]}
            />
            </View>
          ),
        }}
        listeners={({ navigation}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('recording', { openBottomSheet: true });
          },
        })}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: 'Analysis',
          tabBarIcon: ({focused, color }) => (
            <MaterialIcons 
              name="menu-book" 
              size={24}
              color={focused ? '#0e0c26' : '#cecfd5'}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
