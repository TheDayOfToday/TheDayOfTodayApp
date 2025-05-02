import { StyleSheet } from "react-native";

export const calendarModalStyles = StyleSheet.create({
      tabContainer: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      tabButton: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
      },
      selectedTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#001D6E',
      },
      tabText: {
        fontFamily: 'Pretendard4',
        fontSize: 16,
        color: '#999',
      },
      selectedTabText: {
        color: '#001D6E',
        fontFamily: 'Pretendard7',
      },
      tabContent: {
        paddingVertical: 15,
        width: '100%',
      },
      diaryTitle: {
        fontFamily: 'Pretendard7',
        fontSize: 18,
        marginBottom: 5,
      },
      diaryText: {
        fontFamily: 'pretendard4',
        fontSize: 14,
        color: '#333',
      },
      analysisText: {
        fontFamily: 'pretendard5',
        fontSize: 14,
        color: '#333',
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
        backgroundColor: '#EEE',
        borderRadius: 5,
        alignItems: 'center',
        width: '45%',
      },
      deleteDiaryButtonText: {
        fontFamily: 'pretendard5',
        fontSize: 16,
        color: '#ff4f4f',
      },
      modalButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#001D6E',
        borderRadius: 5,
        alignItems: 'center',
        width: '45%',
      },
      modalButtonText: {
        fontFamily: 'pretendard5',
        fontSize: 16,
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
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 12,
      },
      moodTag: {
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold',
        marginBottom: 4,
      },
});
