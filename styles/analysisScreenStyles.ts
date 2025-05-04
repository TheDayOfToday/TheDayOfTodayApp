import { StyleSheet } from "react-native";

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
  },
  headerText: {
    fontFamily: 'Hakgyoansim',
    fontSize: 24,
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
    fontSize: 14,
    color: '#666',
  },
  contentDegree: {
    fontFamily: 'Hakgyoansim',
    fontSize: 16,
    color: '#0066CC',
  },
  contentFeedback: {
    fontFamily: 'Hakgyoansim',
    fontSize: 16,
    lineHeight: 22,
  },
});
