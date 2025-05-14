import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

export const calendarModalStyles = StyleSheet.create({
      tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
      },
      tabButton: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
      },
      selectedTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#96A0CC',
      },
      tabText: {
        fontFamily: 'Pretendard4',
        fontSize: RFValue(16),
        color: '#ddd',
      },
      selectedTabText: {
        color: '#96A0CC',
        fontFamily: 'Pretendard7',
      },
      tabContent: {
        height: 'auto',
        width: '100%',
      },
      tabNoContent: {
        alignItems: 'center',
      },
      diaryTitle: {
        fontFamily: 'Pretendard7',
        fontSize: RFValue(18),
        color: '#ddd',
        marginBottom: 5,
      },
      diaryText: {
        fontFamily: 'Pretendard4',
        fontSize: RFValue(14),
        color: '#ddd',
        lineHeight: 22,
      },
      analysisText: {
        fontFamily: 'Pretendard5',
        fontSize: RFValue(14),
        color: '#ddd',
        lineHeight: 22,
      },
      modalButtonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      deleteDiaryButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#5F5E6D',
        borderRadius: 5,
        alignItems: 'center',
        width: '45%',
      },
      deleteDiaryButtonText: {
        fontFamily: 'Pretendard5',
        fontSize: RFValue(16),
        color: '#ed3e3e',
      },
      modalButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#96A0CC',
        borderRadius: 5,
        alignItems: 'center',
        width: '45%',
      },
      modalButtonText: {
        fontFamily: 'Pretendard5',
        fontSize: RFValue(16),
        color: 'white',
      },
      dateRow: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },      
      arrowIcon: {
        alignSelf: 'center',
        marginTop: 4,
      },      
      dateText: {
        fontFamily: 'Pretendard6',
        fontSize: RFValue(18),
        color: '#ddd',
        marginHorizontal: 12,
      },
      moodTag: {
        fontFamily: 'Pretendard8',
        fontSize: RFValue(14),
        color: '#666',
        marginBottom: 4,
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        minHeight: 200,
      },
});
