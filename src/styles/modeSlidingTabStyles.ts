import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const modeSlidingTabStyles = StyleSheet.create({
    sheet: {
        paddingHorizontal: 25,
    },
    backgroundSheet: {
        borderRadius: 25,
        backgroundColor: '#212129',
    },
    sheetView: {
        backgroundColor: '#212129',
    },
    sheetHeaderContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    sheetHeaderTitle: {
        flexWrap: 'wrap',
        fontFamily: 'Pretendard4',
        fontSize: RFValue(24),
        color: '#ccc',
        textAlign: 'center',
        width: '100%',
    },
    recordButtonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    recordButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginVertical: 20,
        backgroundColor: '#17171C',
    },
    recordButtonText: {
        fontFamily: 'Pretendard5',
        fontSize: RFValue(16),
        color: '#ddd',
    },
});
