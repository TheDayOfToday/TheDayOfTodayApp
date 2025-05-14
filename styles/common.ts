import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontFamily: 'Pretendard4',
        fontSize: RFValue(24),
        color: '#001D6E',
    },
    headerStyle: {
        backgroundColor: '#17171E',
    },
});
