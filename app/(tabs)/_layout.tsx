import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';

import { layoutStyles } from '@/src/styles/layoutStyles';

function TabLayout() {
  const router = useRouter();
  const SettingButton = () => (
    <Pressable
      style={layoutStyles.settingButton}
      onPress={() => router.push('/setting')}
    >
      <MaterialIcons name="person-outline" size={26} color="#ddd" />
    </Pressable>
  );

  const pathname = usePathname();
  const isModeTab = pathname === '/record';

  return (
    <SafeAreaView style={layoutStyles.container}>
      <Tabs
        screenOptions={() => ({
          headerShown: true,
          headerStyle: layoutStyles.header,
          headerTitle: '오늘의 하루',
          headerTitleStyle: layoutStyles.headerTitle,
          headerRight: () => <SettingButton />,
          tabBarStyle: isModeTab ? layoutStyles.modeTabBar : layoutStyles.tabBar,
          tabBarLabelStyle: layoutStyles.tabBarLabel,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#63636E',
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: '홈',
            tabBarIcon: ({ focused, color: _color }) => (
              <Entypo
                name="home"
                size={24}
                color={focused ? '#fff' : '#63636E'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="record"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused, color: _color }) => (
              <View
                style={[
                  layoutStyles.recordButtonContainer,
                  focused && layoutStyles.recordButtonContainerFocused,
                ]}
              >
                <MaterialIcons
                  name="keyboard-voice"
                  size={32}
                  style={[
                    layoutStyles.recordButton,
                    focused && layoutStyles.recordButtonFocused,
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
            title: '분석',
            tabBarIcon: ({ focused, color: _color }) => (
              <MaterialIcons 
                name="menu-book" 
                size={24}
                color={focused ? '#fff' : '#63636E'}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

export default TabLayout;
