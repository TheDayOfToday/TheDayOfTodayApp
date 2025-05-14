import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const ModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },
  modalTitle: {
    fontFamily: 'Pretendard7',
    fontSize: RFValue(20),
    textAlign: 'center',
  },
  modalSubtitle: {
    fontFamily: 'Pretendard4',
    fontSize: RFValue(16),
    textAlign: 'center',
  },
  modalButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  finishButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#101013',
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  finishButtonText: {
    fontFamily: 'Pretendard5',
    fontSize: RFValue(16),
    color: '#eee',
  },
  deleteDiaryButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#101013',
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  deleteDiaryButtonText: {
    fontFamily: 'Pretendard5',
    fontSize: RFValue(16),
    color: '#ed3e3e',
  },
  cancelButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  cancelButtonText: {
    fontFamily: 'Pretendard5',
    fontSize: RFValue(16),
    color: '#0e0c26',
  },
});
