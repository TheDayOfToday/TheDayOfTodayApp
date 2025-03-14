import { StyleSheet } from "react-native";

export const moodSlidingTabStyles = StyleSheet.create({
  sheet: {
      paddingHorizontal: 25,
  },
  sheetView: {
      //add
  },
  sheetHeaderContainer: {
      alignItems: 'center',
      marginVertical: 10,
  },
  sheetHeaderTitle: {
      fontFamily: 'NanumSquare4',
      fontSize: 24,
      textAlign: 'center',
      width: '100%',
  },
  recordButtonContainer:{
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
  },
  recordButton: {
      flex: 1,
      alignItems: 'center',
      minWidth: 120,
      maxWidth: 180,
      paddingVertical: 12,
      paddingHorizontal: 20,
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