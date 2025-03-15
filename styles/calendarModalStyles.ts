import { StyleSheet } from "react-native";

export const calendarModalStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        width: 320,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
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
        borderBottomColor: '#007bff',
      },
      tabText: {
        fontSize: 16,
        color: '#999',
      },
      selectedTabText: {
        color: '#007bff',
        fontWeight: 'bold',
      },
      tabContent: {
        paddingVertical: 15,
        width: '100%',
      },
      diaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      diaryText: {
        fontSize: 14,
        color: '#333',
      },
      analysisText: {
        fontSize: 14,
        color: '#666',
      },
      modalButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
      },
      modalButtonText: {
        color: 'white',
        fontSize: 16,
      },
});
