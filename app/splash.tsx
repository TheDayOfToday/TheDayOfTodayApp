import { useEffect, useState } from 'react';
import { View, Image } from 'react-native';

import { splashStyles } from '@/src/styles/splashStyles';

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      onFinish(); // 스플래쉬 화면 종료 콜백 호출
    }, 2000); // 2초 후 종료
  }, []);

  if (!visible) return null; // 스플래쉬 화면 숨김

  return (
    <View style={splashStyles.container}>
      <Image
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        source={require('@/assets/images/splash-iconv3.png')}
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 200, height: 200, resizeMode: 'contain'}}
        resizeMode="contain"
      />
    </View>
  );
}

export default SplashScreen;
