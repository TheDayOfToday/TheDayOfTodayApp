import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

export const modeSlidingTabStyles = StyleSheet.create({
    sheet: {
        paddingHorizontal: 25,
    },
    backgroundSheet: {
        //add
    },
    sheetView: {
        //add
    },
    sheetHeaderContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    sheetHeaderTitle: {
        fontFamily: 'Pretendard6',
        fontSize: RFValue(24),
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
        backgroundColor: '#0e0c26',
    },
    recordButtonText: {
        fontFamily: 'Pretendard5',
        fontSize: RFValue(16),
        color: '#fff',
    },
});
