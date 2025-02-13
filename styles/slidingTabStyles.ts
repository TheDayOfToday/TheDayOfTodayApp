import { StyleSheet } from "react-native";

export const slidingTabStyles = StyleSheet.create({
    sheet: {
        padding: 25,
    },
    sheetView: {
        // 컨텐츠 스타일
    },
    sheetHeaderContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    sheetHeaderTitle: {
        fontFamily: 'NanumSquare4',
        fontSize: 24,
    },
    recordButtonContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 35,
    },
    recordButton: {
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 8,
        marginVertical: 20,
        backgroundColor: '#0e0c26',
    },
    recordButtonText: {
        fontFamily: 'NanumSquare3',
        fontSize: 16,
        color: '#fff',
    },
    cancleButtonContainer: {
        alignItems: 'flex-end',
    },
    cancleButton: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 130,
        backgroundColor: '#f7f7f7',
    },
    cancleButtonText: {
        fontFamily: 'NanumSquare2',
        fontSize: 16,
        color: '#333',
    },
});
