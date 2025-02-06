import { StyleSheet } from 'react-native';

const BACKCOLOR = '#F3F2ED';

export const styles = StyleSheet.create({        
    safeArea: {
        flex: 1,
        // backgroundColor: BACKCOLOR,
      },
      container: {
        flex: 1,
        // backgroundColor: BACKCOLOR,
      },      
      calendar: {
        // flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        // backgroundColor: BACKCOLOR,
      },
      dayContainer: {        
        width: 50,
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 4,
        // backgroundColor: BACKCOLOR,
      },
      dayText: {
        fontSize: 16,
        color: '#2d4150',
        marginTop: 32,        
      },
      disabledText: {
        color: '#b9babd',
      },
      selectedDayText: {
        color: '#0e0c26',
        fontWeight: 'bold',
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2d4150',
      },
      modalDate: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
      },
      modalButton: {
        backgroundColor: '#0e0c26',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
      },
      modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
      },
});