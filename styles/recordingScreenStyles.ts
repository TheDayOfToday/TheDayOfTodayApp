import { StyleSheet } from 'react-native';

export const recordingScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    recordScreen: {
        flex: 1,
        alignItems: 'center',
        gap: 15,
        height: '100%',
    },
    messageContainer: {
        paddingVertical: 100,
        alignItems: 'center',
    },
    message: {
        fontFamily: 'NanumSquare3',
        fontSize: 25,
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
