import React from 'react';
import { View, Text } from 'react-native';
import useDoubleBackExit from '@/src/hooks/useDoubleBackExit';

function NotFoundScreen() {
  useDoubleBackExit(true);
  return (
    <>
      <View>
        <Text>Not Found</Text>
      </View>
    </>
  );
}

export default NotFoundScreen;
