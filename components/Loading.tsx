import { SafeAreaView, Text, View } from "react-native";
import LottieView from 'lottie-react-native';
import { loadingStyles } from "@/styles/loadingStyles";

interface LoadingScreenPops {
  backgroundColor?: string;
}

function LoadingScreen({ backgroundColor = '#0e0c26' }: LoadingScreenPops) {
  return (
    <SafeAreaView style={[loadingStyles.screenContainer, { backgroundColor }]}>
      <LottieView
        source={require('../assets/loading.json')}
        autoPlay
        loop
        speed={1}
        style={loadingStyles.lottie}
      />
    </SafeAreaView>
  )
}

export default LoadingScreen;
