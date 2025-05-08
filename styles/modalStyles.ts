import { StyleSheet } from 'react-native';

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
    fontSize: 20,
    // marginBottom: 10,
  },
  modalSubtitle: {
    fontFamily: 'Pretendard4',
    fontSize: 16,
    // marginBottom: 20,
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
    backgroundColor: '#0e0c26',
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  finishButtonText: {
    fontFamily: 'pretendard5',
    fontSize: 16,
    color: '#eee',
  },
  deleteDiaryButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#0e0c26',
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  deleteDiaryButtonText: {
    fontFamily: 'pretendard5',
    fontSize: 16,
    color: '#ff4f4f',
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
    fontFamily: 'pretendard5',
    fontSize: 16,
    color: '#0e0c26',
  },
});
