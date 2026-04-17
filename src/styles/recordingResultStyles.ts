import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const recordingResultStyles = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: '#17171E',
  },
  container: {
    padding: 30,
    gap: 20,
  },
  nextButtonContainer: {
    alignItems: 'flex-end',
  },
  nextButton: {

  },
  nextButtonText: {
    fontFamily: 'Pretendard5',
    fontSize: RFValue(16),
    borderBottomWidth: 2,
    borderBottomColor: '#999',
    color: '#ddd',
    paddingBottom: 4,
  },
  titleInputContainer: {
    display: 'flex',
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  title: {
    padding: 5,
    fontFamily: 'Hakgyoansim',
    fontSize: RFValue(20),
    color: '#ddd',
  },
  titleBorderFocused: {
    borderBottomColor: '#132a9e',
    borderBottomWidth: 1,
  },
  titleBorderUnfocused: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  resultContainer: {
    flex: 1,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 15,
    backgroundColor: '#2C2C35',
    padding: 15,
  },
  resultText: {
    flex: 1,
    width: '100%',
    fontFamily: 'Hakgyoansim',
    fontSize: RFValue(16),
    color: '#ddd',
    lineHeight: 28,
  },
  saveButtonContainer: {
    alignItems: 'flex-end',
    padding: 10,
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#2C2C35',
    backgroundColor: '#1f1f24',
  },
  saveButtonText: {
    fontFamily: 'Pretendard4',
    fontSize: RFValue(16),
    color: '#ddd',
  },
});
