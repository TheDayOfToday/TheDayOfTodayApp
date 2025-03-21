import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({        
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
      },
      container: {
        flex: 1,
      },      
      calendar: {
        // flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
      dayContainer: {        
        width: 50,
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 4,
      },
      dayText: {
        fontFamily: 'Pretendard4',
        fontSize: 16,
        color: '#2d4150',
        marginTop: 32,        
      },
      disabledText: {
        color: '#b9babd',
      },
      selectedDayText: {
        fontFamily: 'Pretendard9',
        color: '#0e0c26',
      },
      circleIcon: {
        position: 'absolute',
        top: 2,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      },
      circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E8E8E8',
      },
      markedCircle: {
        backgroundColor: '#0e0c26',
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '80%',
        alignItems: 'center',
      },
      modalTitle: {
        fontFamily: 'Pretendard4',
        fontSize: 18,
        marginBottom: 10,
        // 무드미터 색상으로 바꾸기
        color: '#2d4150',
      },
});