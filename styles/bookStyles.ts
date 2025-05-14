import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

export const bookStyles = StyleSheet.create({
  component: {
    marginHorizontal: '3%',
    marginBottom: '13%',
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginHorizontal: '3%',
    marginVertical: '3%',
  },
  titleText: {
    fontFamily: 'Pretendard6',
    fontSize: RFValue(16),
    color: '#D6DEFD',
  },
  container: {
    borderRadius: 20,
    backgroundColor: '#17171C',     
    paddingHorizontal: '3%',
    paddingVertical: '3%',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: '5%',
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C35',
    width: 100,
    height: 200,
    borderWidth: 0.5,
    borderColor: '#aaa',
    borderRadius: 5,
  },
  cover: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  fallbackCover: {
    resizeMode: 'contain',
  },
  infoContainer: {
    gap: '10%',
  },
  bookTitle: {
    fontFamily: 'Pretendard6',
    fontSize: RFValue(16),
    color: '#eee',
  },
  bookAuthor: {
    fontFamily: 'Pretendard4',
    fontSize: RFValue(12),
    color: '#ccc',
  },
  bookDescription: {
    fontFamily: 'Pretendard4',
    fontSize: RFValue(12),
    color: '#ccc',
  },
  noBookInfo: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: '3%',
  },
  noBookInfoText: {
    fontFamily: 'Pretendard4',
    fontSize: RFValue(16),
    color: '#ccc',
  },
});
