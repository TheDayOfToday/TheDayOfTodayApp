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
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        color: '#aac9ff',
        fontFamily: 'Pretendard3',
        fontSize: 26,
    },
    nextButtonContainer: {
        alignItems: 'flex-end',
        paddingHorizontal: 10,
    },
    nextButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    nextButtonText: {
        fontFamily: 'Pretendard5',
        fontSize: 16,
        color: '#aac9ff',
    },
    recordingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: '100%',
        height: '100%',
    },
    submitButtonContainer: {
        alignItems: 'flex-end',
        padding: 20,
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
    completeButtonContainer: {
        alignItems: 'center',
        padding: 50,
    },
    completeButton: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#ff5d5d',
    },
});
