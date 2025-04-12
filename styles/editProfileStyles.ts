import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
    label: { fontSize: 16, marginBottom: 8, color: '#333' },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 15,
      marginBottom: 20,
      fontSize: 16,
    },
    saveButton: {
      backgroundColor: '#5DA3FA',
      paddingVertical: 15,
      borderRadius: 8,
      marginTop: 10,
    },
    saveButtonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  });