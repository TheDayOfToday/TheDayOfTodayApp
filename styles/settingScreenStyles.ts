import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20 
  },
  header: { 
    fontFamily: 'Pretendard8',
    fontSize: RFValue(22), 
    marginBottom: 30 
  },
  profileSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 30 
  },
  profileImage: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginRight: 15 
  },
  userName: { 
    fontFamily: 'Pretendard7',
    fontSize: RFValue(18), 
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
    color: '#5DA3FA', 
    marginTop: 5 
  },
  deleteUsetText: {    
    color: '#FF4D4F', 
    marginTop: 5
  },
  section: { 
    backgroundColor: '#FAFAFA', 
    padding: 20, 
    borderRadius: 10 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  sectionTitle: { 
    fontFamily: 'Pretendard8',
    fontSize: RFValue(18), 
  },
  editText: { 
    fontFamily: 'Pretendard6',
    color: '#5DA3FA', 
    fontSize: RFValue(15) 
  },
  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15 
  },
  infoLabel: { 
    fontFamily: 'Pretendard6',
    fontSize: RFValue(15), 
    color: '#333' 
  },
  infoValue: { 
    fontFamily: 'Pretendard4',
    fontSize: RFValue(15), 
    color: '#666' 
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  editPasswordButton: {
    paddingVertical: 10, 
    paddingHorizontal: 16,
  },
});
