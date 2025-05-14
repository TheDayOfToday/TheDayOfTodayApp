import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171E',
    padding: 20,
  },
  headerContainer: {
    marginBottom: '10%',
  },
  headerText: {
    fontFamily: 'Pretendard6',
    fontSize: RFValue(22),
    color: '#D6DEFD',
  },
  contentContainer: {
    display: 'flex',
    gap: '8%',
  },
  label: {
    lineHeight: 30,
    fontFamily: 'Pretendard4',
    fontSize: RFValue(16),
    color: '#7A7E9B'
  },
  input: {
    borderWidth: 1,
    borderColor: '#69728F',
    borderRadius: 8,
    padding: 15,
    fontSize: RFValue(16),
  },
  saveButton: {
    backgroundColor: '#D6DEFD',
    paddingVertical: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    fontFamily: 'Pretendard6',
    color: '#69728F',
    textAlign: 'center',
    fontSize: RFValue(16),
  },
});
