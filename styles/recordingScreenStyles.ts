import { StyleSheet } from 'react-native';

export const recordingScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    recordScreen: {
        backgroundColor: '#010717',
        flex: 1,
        justifyContent: 'space-between',
        gap: 15,
        paddingTop: '20%',
        height: '100%',
    },
    messageContainer: {
        alignItems: 'center',
    },
    message: {
        color: '#fff',
        fontFamily: 'NanumSquare3',
        fontSize: 25,
    },
    recordingContainer: {
        alignItems: 'center',
    },
    recordingText: {
        color: '#fff',
    },
    submitButtonContainer: {
        alignItems: 'flex-end',
        padding: 10,
    },
    submitButton: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 130,
        backgroundColor: '#f5f5f5',
        opacity: 0.7,
    },
    submitButtonText: {
        fontFamily: 'NanumSquare2',
        fontSize: 16,
        color: '#333',
    },
});
