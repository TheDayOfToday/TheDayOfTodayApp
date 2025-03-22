import { StyleSheet } from "react-native";

export const recordingResultStyles = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#e5e5e5',
    paddingBottom: 4,
  },
  title: {
    padding: 5,
    fontFamily: 'Hakgyoansim',
    fontSize: 22,
    color: '#132a9e',
  },
  resultContainer: {
    flexWrap: "wrap",
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    // 무드미터 색으로 변경하기
    borderColor: '#132a9e',
    padding: 15,
  },
  resultText: {
    fontFamily: 'Hakgyoansim',
    fontSize: 18,
  },
  saveButtonContainer: {
    alignItems: 'flex-end',
    padding: 10,
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 130,
    backgroundColor: '#f5f5f5',
  },
  saveButtonText: {
    fontFamily: 'Pretendard4',
    fontSize: 16,
    color: '#333',
  },
});
