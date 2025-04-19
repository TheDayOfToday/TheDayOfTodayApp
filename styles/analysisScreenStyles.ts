import { StyleSheet } from "react-native";

export const analysisScreenStyles = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    padding: 30,
    gap: 10,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Hakgyoansim',
    fontSize: 24,
  },
  contentContainer: {
    backgroundColor: '#fafafa',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 15,
    padding: 25,
  },
  contentText: {
    fontFamily: 'Hakgyoansim',
    fontSize: 18,
  },

  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  contentDegree: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '600',
    marginBottom: 8,
  },
  contentFeedback: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
  },
  contentDate: {
    fontSize: 14,
    color: '#999',
  },
});
