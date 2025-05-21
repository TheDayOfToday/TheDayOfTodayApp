import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

export const analysisScreenStyles = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: '#101013',
  },
  container: {
    alignItems: 'center',
    padding: 30,
    paddingTop: 0,
    gap: 10,
  },
  dateContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2C2C35',
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dataButton: {
    width: '15%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    textAlign: 'center',
  },
  headerText: {
    fontFamily: 'Hakgyoansim',
    fontSize: RFValue(20),
    color: '#D6DEFD',
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2C2C35',
    borderRadius: 15,
    padding: 25,
    gap: 16,
  },
  contentDate: {
    fontFamily: 'Hakgyoansim',
    fontSize: RFValue(14),
    color: '#D6DEFD',
    lineHeight: 22,
  },
  contentFeedback: {
    fontFamily: 'Hakgyoansim',
    fontSize: RFValue(16),
    color: '#ddd',
    lineHeight: 28,
  },
});
