import React from 'react';
import { View, Text, TouchableOpacity, Image, Modal, Pressable } from 'react-native';

import { useDeleteAccount } from '@/src/hooks/useDeleteAccount';
import { useUserInfo } from '@/src/hooks/useUserInfo';
import { ModalStyles } from '@/src/styles/modalStyles';
import { styles } from '@/src/styles/settingScreenStyles';

function SettingScreen() {
  const { user, formattedPhoneNumber, handleLogout, navigateToEditPassword } = useUserInfo();
  const { modalIsOpen, openModal, closeModal, handleDeleteAndClose } = useDeleteAccount();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>마이페이지</Text>

      <View style={styles.profileSection}>
        <Image source={{ uri: user.profileImage || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} style={styles.profileImage} />
        <View style={styles.headerContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} style={styles.logoutButton}>
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>회원정보</Text>
          <TouchableOpacity onPress={navigateToEditPassword} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} style={styles.editPasswordButton}>
            <Text style={styles.editText}>비밀번호 수정</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이름</Text>
          <Text style={styles.infoValue}>{user.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>이메일</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>전화번호</Text>
          <Text style={styles.infoValue}>{formattedPhoneNumber}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={openModal}
        style={styles.userDeleteButton}
      >
        <Text style={styles.deleteUserText}>회원 탈퇴</Text>
      </TouchableOpacity>
      {modalIsOpen && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalIsOpen}
          onRequestClose={closeModal}
        >
          <View style={ModalStyles.modalOverlay}>
            <View style={ModalStyles.modalContent}>
              <Text style={ModalStyles.modalTitle}>정말 탈퇴하시겠습니까?</Text>
              <View>
                <Text style={ModalStyles.modalSubtitle}>탈퇴하시면 모든 데이터가 삭제되며</Text>
                <Text style={ModalStyles.modalSubtitle}>복구할 수 없습니다.</Text>
              </View>
              <View style={ModalStyles.modalButtonContainer}>
                <Pressable
                  style={ModalStyles.finishButton}
                  onPress={handleDeleteAndClose}
                >
                  <Text style={ModalStyles.finishButtonText}>확인</Text>
                </Pressable>
                <Pressable
                  style={ModalStyles.cancelButton}
                  onPress={closeModal}
                >
                  <Text style={ModalStyles.cancelButtonText}>취소</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

export default SettingScreen;
