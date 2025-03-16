import { StyleSheet } from "react-native";

export const moodSlidingTabStyles = StyleSheet.create({
    sheetView: {
        padding: 25,
    },
    headerTitle: {
        fontFamily: 'NanumSquare4',
        fontSize: 20,
        textAlign: 'left',
        width: '100%',
    },
    content: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    submitButtonContainer: {
        alignItems: 'flex-end',
    },
    submitButton: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 130,
        backgroundColor: '#f7f7f7',
    },
    submitButtonText: {
        fontFamily: 'NanumSquare2',
        fontSize: 16,
        color: '#333',
    },
});
