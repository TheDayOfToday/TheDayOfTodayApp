import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const toastStyles = StyleSheet.create({
  container: {
    opacity: 0.7,
    borderLeftWidth: 7,
    borderRadius: 10,
    backgroundColor: '#474754',
  },
  titleText: {
    fontFamily: 'Pretenard7',
    fontSize: RFValue(16),
    color: '#fff',
  },
  messageText: {
    fontFamily: 'Pretenard4',
    fontSize: RFValue(12),
    color: '#eee',
  },
});
