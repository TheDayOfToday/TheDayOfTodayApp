import { StyleSheet } from "react-native";

export const moodSlidingTabStyles = StyleSheet.create({
    backgroundSheet: {
        backgroundColor: '#fff',
    },
    sheetView: {
        padding: 25,
    },
    headerContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: 'Pretendard8',
        fontSize: 20,
        color: '#000',
        textAlign: 'left',
    },
    submitButton: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 20,
        backgroundColor: '#010717',
    },
    submitButtonText: {
        fontFamily: 'Pretendard5',
        fontSize: 16,
        color: '#fff',
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
});
