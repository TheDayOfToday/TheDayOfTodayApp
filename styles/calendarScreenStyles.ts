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
        marginTop: 4,
      },    
      disabledText: {
        color: '#b9babd',
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
        marginBottom: 4,
        backgroundColor: '#E8E8E8',
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
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        minHeight: 300,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
      },
      loadingText: {
        fontSize: 16,
        color: '#666',
        marginTop: 12,
        textAlign: 'center',
        fontWeight: '500',
      },
});
