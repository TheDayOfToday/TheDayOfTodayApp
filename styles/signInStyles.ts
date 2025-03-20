import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 20 
    },
    title: { 
        fontSize: 36, 
        fontWeight: 'bold', 
        color: '#001D6E', 
        marginBottom: 30 
    },
    loginLabel: { 
        alignSelf: 'flex-start', 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 10 
    },
    input: { 
        width: '100%', 
        height: 50, 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 10, 
        paddingHorizontal: 15, 
        marginBottom: 10 
    },
     passwordContainer: { 
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 10, 
        paddingHorizontal: 15, 
        marginBottom: 10 
    },
     inputPassword: { 
        flex: 1, 
        height: 50 
    },
     loginButton: { 
        width: '100%', 
        height: 50, 
        backgroundColor: '#007BFF', 
        borderRadius: 10, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 20 
    },
    loginButtonText: { 
        color: 'white', 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
    signUpContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 20 
    },
    signUpText: { 
        color: '#007BFF', 
        fontWeight: 'bold' 
    },
});
