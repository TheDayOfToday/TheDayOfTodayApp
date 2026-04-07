import { SafeAreaView } from "react-native";
import LottieView from 'lottie-react-native';
import { loadingStyles } from "@/src/styles/loadingStyles";

interface LoadingScreenProps {
  backgroundColor?: string;
}

function LoadingScreen({ backgroundColor = '#101013' }: LoadingScreenProps) {
  return (
    <SafeAreaView style={[loadingStyles.screenContainer, { backgroundColor }]}>
      <LottieView
        source={require('../../../assets/loading.json')}
        autoPlay
        loop
        speed={1}
        style={loadingStyles.lottie}
      />
    </SafeAreaView>
  );
}

export default LoadingScreen;
