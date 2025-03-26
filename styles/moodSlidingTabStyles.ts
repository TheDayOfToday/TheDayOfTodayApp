import { StyleSheet } from "react-native";

export const moodSlidingTabStyles = StyleSheet.create({
    backgroundSheet: {
        backgroundColor: '#fff',
    },
    sheetView: {
        padding: 25,
    },
    headerTitle: {
        fontFamily: 'Pretendard6',
        fontSize: 20,
        color: '#000',
        textAlign: 'left',
        width: '100%',
    },
    content: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    moodContainer: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#bbb',
        padding: '3%',
    },
    moodDegreeText: {
        fontFamily: 'Pretendard3',
        fontSize: 18,
    },
    moodButtonContainer: {
        marginVertical: '5%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    moodButton: {
        flexDirection: 'row',
        padding: '4%',
        margin: '2%',
        borderRadius: 30,
        borderWidth: 1,
    },
    selectedMoodButton: {
        backgroundColor: '#eee',
    },
    moodButtonText: {
        fontFamily: 'Pretendard4',
        fontSize: 14,
        color: '#000',
    },
    submitButtonContainer: {
        alignItems: 'flex-end',
    },
    submitButton: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 130,
        backgroundColor: '#f5f5f5',
    },
    submitButtonText: {
        fontFamily: 'Pretendard3',
        fontSize: 16,
        color: '#333',
    },
});
