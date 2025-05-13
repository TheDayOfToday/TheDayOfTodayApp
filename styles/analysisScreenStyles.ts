import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

export const analysisScreenStyles = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    padding: 30,
    paddingTop: 0,
    gap: 10,
  },
  dateContainer: {
    width: '100%',
    height: '20%',
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
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 15,
    padding: 25,
    gap: 16,
  },
  contentDate: {
    fontFamily: 'Hakgyoansim',
    fontSize: RFValue(14),
    color: '#666',
  },
  contentFeedback: {
    fontFamily: 'Hakgyoansim',
    fontSize: RFValue(16),
    lineHeight: 22,
  },
});
