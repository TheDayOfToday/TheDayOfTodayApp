import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    marginBottom: '10%',
  },
  headerText: {
    fontFamily: 'Pretendard8',
    fontSize: 22,
  },
  contentContainer: {
    display: 'flex',
    gap: '8%',
  },
  label: {
    lineHeight: 30,
    fontFamily: 'Pretendard4',
    fontSize: 16,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#0e0c26',
    paddingVertical: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    fontFamily: 'Pretendard6',
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
