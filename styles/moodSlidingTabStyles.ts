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
    suggestedMoodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: '2%',
    },
    suggestionLabelText: {
        fontFamily: 'Pretendard4',
        fontSize: 18,
    },
    suggestedMood: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '2%',
        margin: '2%',
        borderBottomWidth: 1,
    },
    suggestedMoodText: {
        fontFamily: 'Pretendard6',
        fontSize: 18,
        color: '#000',
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
        alignItems: 'center',
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
        marginBottom: '15%',
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
