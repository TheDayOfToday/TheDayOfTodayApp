import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { 
        flexGrow: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 20 
    },
    title: { 
        fontSize: 28, 
        fontWeight: 'bold', 
        marginBottom: 20, 
        color: '#001D6E' 
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  });
