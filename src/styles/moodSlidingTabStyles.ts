import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const moodSlidingTabStyles = StyleSheet.create({
    backgroundSheet: {
        backgroundColor: '#212129',
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
        fontFamily: 'Pretendard6',
        fontSize: RFValue(20),
        color: '#fff',
        textAlign: 'left',
    },
    submitButton: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 20,
        backgroundColor: '#434347',
    },
    submitButtonText: {
        fontFamily: 'Pretendard5',
        fontSize: RFValue(16),
        color: '#eee',
    },
    content: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    suggestedMoodContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',
        padding: '2%',
    },
    suggestionLabelText: {
        fontFamily: 'Pretendard4',
        fontSize: RFValue(18),
        color: '#eee',
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
        fontSize: RFValue(18),
        color: '#eee',
    },
    moodContainer: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#bbb',
        padding: '3%',
    },
    moodDegreeText: {
        fontFamily: 'Pretendard3',
        fontSize: RFValue(18),
        color: '#eee',
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
        backgroundColor: '#000',
    },
    moodButtonText: {
        fontFamily: 'Pretendard4',
        fontSize: RFValue(14),
        color: '#eee',
    },
    loadingText: {
        color: '#fff',
    },
});
