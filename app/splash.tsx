import { View, Image } from "react-native";
import { useEffect, useState } from "react";
import { splashStyles } from '../styles/splashStyles';

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
        source={require('@/assets/images/splash-icon.png')}
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 200, height: 200, resizeMode: 'contain'}}
        resizeMode="contain"
      />
    </View>
  );
}

export default SplashScreen;
