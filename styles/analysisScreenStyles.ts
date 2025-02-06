import { StyleSheet } from "react-native";

export const analysisScreenStyles = StyleSheet.create({
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
    borderWidth: 2,
    borderRadius: 15,
    // borderColor: 'pink',
    padding: 25,
  },
  contentText: {
    fontFamily: 'MaruBuri3',
    fontSize: 17,
  },
});
