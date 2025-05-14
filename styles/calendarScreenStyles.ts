import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({        
    safeArea: {
        flex: 1,
        backgroundColor: '#101013',
      },
      container: {
        flex: 1,
        backgroundColor: '#101013',
        gap: '1.5%',
      },
      loadingLottieContainer: {
        flex: 1,
        backgroundColor: '#101013',
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingLottie: {
        width: '50%',
        height: '50%',
      },
      calendar: {
        marginHorizontal: '3%',
        borderRadius: 20,
        backgroundColor: '#17171C',     
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
      dayContainer: {
        backgroundColor: '#17171C',     
        width: 50,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      dayText: {
        fontFamily: 'Pretendard4',
        fontSize: RFValue(14),
        color: '#ddd',
        marginTop: 4,
      },    
      disabledText: {
        color: '#6B6B73',
      },          
      circle: {
        borderRadius: 10,
        width: '80%',
        height: '10%',
        marginBottom: 4,
      },     
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: '#2c2c35',
        borderRadius: 20,
        padding: 20,
        width: '80%',
        maxHeight: '50%',
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        minHeight: 300,
        backgroundColor: '#16161b',
        borderRadius: 10,
      },
});
