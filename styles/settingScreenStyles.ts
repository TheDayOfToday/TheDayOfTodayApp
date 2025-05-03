import EditPassword from '@/app/editPassword';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20 
  },
  header: { 
    fontSize: 22, 
    fontWeight: 'bold', 
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
    fontSize: 18, 
    fontWeight: '600' 
  },
  badge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: { 
    color: '#fff', 
    fontSize: 12 
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
    fontSize: 18, 
    fontWeight: '600' 
  },
  editText: { 
    color: '#5DA3FA', 
    fontSize: 15 
  },
  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15 
  },
  infoLabel: { 
    fontSize: 15, 
    color: '#333' 
  },
  infoValue: { 
    fontSize: 15, 
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
