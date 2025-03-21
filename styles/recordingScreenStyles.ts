import { StyleSheet } from 'react-native';

export const recordingScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e0c26',
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
        fontFamily: 'Pretendard3',
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
        paddingHorizontal: 30,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        opacity: 0.7,
    },
    submitButtonText: {
        fontFamily: 'Pretendard5',
        fontSize: 16,
        color: '#fff',
    },
});
