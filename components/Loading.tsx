import { SafeAreaView, Text, View } from "react-native";
import LottieView from 'lottie-react-native';
import { loadingStyles } from "@/styles/loadingStyles";

function LoadingScreen() {
  return (
    <SafeAreaView style={loadingStyles.screenContainer}>
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
