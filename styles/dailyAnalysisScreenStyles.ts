import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

export const dailyAnalysisScreenStyles = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: '#17171E',
  },
  container: {
    padding: 30,
    gap: 20,
  },
  finishButtonContainer: {
    alignItems: 'flex-end',
  },
  finishButton: {

  },
  finishButtonText: {
    fontFamily: 'Pretendard5',
    fontSize: RFValue(16),
    borderBottomWidth: 2,
    borderBottomColor: '#999',
    color: '#ddd',
    paddingBottom: 4,
  },
  title: {
    padding: 5,
    fontFamily: 'Hakgyoansim',
    fontSize: RFValue(22),
    color: '#ddd',
  },
  resultContainer: {
    flexWrap: "wrap",
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 15,
    // 무드미터 색으로 변경하기
    backgroundColor: '#2C2C35',
    padding: 15,
  },
  resultText: {
    fontFamily: 'Hakgyoansim',
    fontSize: RFValue(16),
    color: '#ddd',
    lineHeight: 28,
  },
});
