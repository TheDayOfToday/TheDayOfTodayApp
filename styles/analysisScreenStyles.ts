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
});
