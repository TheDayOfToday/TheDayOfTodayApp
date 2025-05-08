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
    loadingLottieContainer: {
        height: '7%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingLottie: {
        width: '100%',
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
        textAlign: 'center',
        color: '#aac9ff',
        fontFamily: 'Pretendard3',
        fontSize: 26,
    },
    // 대화 모드 질문 받기 버튼
    nextButtonContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        alignSelf: 'center',
        paddingHorizontal: 10,
    },
    nextButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    nextButtonText: {
        fontFamily: 'Pretendard5',
        fontSize: 18,
        color: '#aac9ff',
    },
    // 대화 모드 녹음 플레이 버튼
    playButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    // 독백 종료
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
    // 대화 마침
    completeButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingBottom: 50,
    },
    completeButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: '#ff5d5d',
    },
});
