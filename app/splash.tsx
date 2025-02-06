import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
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
      <Text style={splashStyles.text}>오늘의 하루 </Text>
      <Ionicons name="pencil-sharp" size={35} color="#0e0c26" />
    </View>
  );
}

export default SplashScreen;
