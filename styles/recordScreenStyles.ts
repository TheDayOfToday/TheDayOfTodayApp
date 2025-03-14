import { StyleSheet } from 'react-native';

export const recordScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    recordScreen: {
        alignItems: 'center',
        padding: 15,
        gap: 15,
    },
    message: {
        fontFamily: 'NanumSquare3',
        fontSize: 20,
    },
    submitButton: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 130,
        backgroundColor: '#fff',
    },
    submitButtonText: {
        fontFamily: 'NanumSquare2',
        fontSize: 16,
        color: '#333',
    },
});
