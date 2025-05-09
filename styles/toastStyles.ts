import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const toastStyles = StyleSheet.create({
  container: {
      opacity: 0.9,
      borderLeftWidth: 7,
      borderRadius: 10,
    },
    titleText: {
      fontFamily: 'Pretenard7',
      fontSize: RFValue(16),
    },
    messageText: {
      fontFamily: 'Pretenard4',
      fontSize: RFValue(14),
    },
});
