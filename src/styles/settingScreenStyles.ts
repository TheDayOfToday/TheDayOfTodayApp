import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#17171E', 
    padding: 20 
  },
  header: { 
    fontFamily: 'Pretendard5',
    fontSize: RFValue(22),
    color: '#ddd',
    marginBottom: 30,
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 30 
  },
  profileImage: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginRight: 15 
  },
  headerContainer: {
    alignContent: 'center',
  },
  userName: { 
    fontFamily: 'Pretendard7',
    fontSize: RFValue(18), 
    color: '#ddd',
  },
  badge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 8,
  },
  nameRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 5 
  },
  logoutText: {
    fontFamily: 'Pretendard4',
    fontSize: RFValue(12),
    color: '#6478c4', 
  },
  deleteUserText: {
    fontFamily: 'Pretendard4',
    fontSize: RFValue(14),
    color: '#FF4D4F', 
    marginTop: 5
  },
  section: { 
    backgroundColor: '#2C2C35', 
    padding: 20, 
    borderRadius: 10 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  sectionTitle: { 
    fontFamily: 'Pretendard6',
    fontSize: RFValue(18), 
    color: '#ddd',
  },
  editText: { 
    fontFamily: 'Pretendard4',
    color: '#6478c4', 
    fontSize: RFValue(15),
  },
  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15,
  },
  infoLabel: { 
    fontFamily: 'Pretendard4',
    fontSize: RFValue(14), 
    color: '#bbb' 
  },
  infoValue: { 
    fontFamily: 'Pretendard3',
    fontSize: RFValue(14), 
    color: '#999' 
  },
  logoutButton: {
    paddingVertical: 10,
  },
  userDeleteButton: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    textAlign: 'center',
    padding: 10,
  },
  editPasswordButton: {
    paddingVertical: 10, 
  },
});
