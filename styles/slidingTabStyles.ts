import { StyleSheet } from "react-native";

export const slidingTabStyles = StyleSheet.create({
    sheet: {
        padding: 30,
    },
    sheetView: {
        // 컨텐츠 스타일
    },
    sheetHeaderContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    sheetHeaderTitle: {
        fontFamily: 'SCDream6',
        fontSize: 24,
    },
    recordButtonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    recordButton: {
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 8,
        marginVertical: 20,
        backgroundColor: '#030a5e',
    },
    recordButtonText: {
        fontFamily: 'SCDream3',
        fontSize: 16,
        color: '#fff',
    },
    cancleButtonContainer: {
        alignItems: 'flex-end',
    },
    cancleButton: {
        paddingVertical: 8,
        paddingHorizontal: 40,
        borderRadius: 130,
        backgroundColor: '#f7f7f7',
    },
    cancleButtonText: {
        fontFamily: 'SCDream3',
        fontSize: 16,
        color: '#333',
    },
});
