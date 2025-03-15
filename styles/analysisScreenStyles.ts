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
    fontFamily: 'MaruBuri5',
    fontSize: 20,
  },
  contentContainer: {
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderRadius: 15,
    padding: 25,
  },
  contentText: {
    fontFamily: 'MaruBuri3',
    fontSize: 17,
  },
});
