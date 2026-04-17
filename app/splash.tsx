import { useEffect, useState } from 'react';
import { View, Image } from 'react-native';

import { splashStyles } from '@/src/styles/splashStyles';

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null; // 스플래쉬 화면 숨김

  return (
    <View style={splashStyles.container}>
      <Image
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        source={require('@/assets/images/splash-iconv3.png')}
        style={splashStyles.image}
        resizeMode="contain"
      />
    </View>
  );
}

export default SplashScreen;
