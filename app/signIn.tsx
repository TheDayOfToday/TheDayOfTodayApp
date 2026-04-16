import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ActivityIndicator, Modal } from 'react-native';

import { usePasswordReset } from '@/src/hooks/usePasswordReset';
import { useSignIn } from '@/src/hooks/useSignIn';
import { styles } from '@/src/styles/signInStyles';

function SignInScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    autoLogin,
    setAutoLogin,
    passwordVisible,
    togglePasswordVisible,
    handleLogin,
    goToSignUp,
    loading,
  } = useSignIn();

  const {
    resetModalVisible,
    resetEmail,
    setResetEmail,
    resetCode,
    setResetCode,
    resetNewPassword,
    setResetNewPassword,
    emailChecked,
    codeChecked,
    openResetModal,
    closeResetModal,
    handleResetEmailCheck,
    handleResetCodeCheck,
    handleResetPassword,
  } = usePasswordReset();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 하루</Text>
      <Text style={styles.loginLabel}>로그인</Text>

      <TextInput
        placeholder="이메일"
        placeholderTextColor="#69728F"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="비밀번호"
          placeholderTextColor="#69728F"
          style={styles.inputPassword}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisible}>
          <Ionicons
            name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#D6DEFD"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Login</Text>}
      </TouchableOpacity>

      <View style={styles.bottomRowContainer}>
        <View style={styles.autoLoginContainer}>
          <Text style={styles.autoLoginLabel}>자동 로그인</Text>
          <Switch
            value={autoLogin}
            onValueChange={setAutoLogin}
            trackColor={{ false: '#f4f3f4', true: '#007AFF' }}
            thumbColor={autoLogin ? '#007AFF' : '#f4f3f4'}
            style={styles.autoLoginSwitch}
          />
        </View>
      </View>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpLabelText}>회원이 아니신가요? </Text>
        <TouchableOpacity onPress={goToSignUp}>
          <Text style={styles.signUpText}>회원가입하기</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={openResetModal}>
        <Text style={styles.resetText}>비밀번호를 잊으셨습니까?</Text>
      </TouchableOpacity>
      <Modal visible={resetModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>비밀번호 초기화</Text>

            <TextInput
              placeholder="이메일 입력"
              placeholderTextColor="#69728F"
              style={styles.modalInput}
              value={resetEmail}
              onChangeText={setResetEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.modalButton} onPress={handleResetEmailCheck}>
              <Text style={styles.modalButtonText}>이메일 확인</Text>
            </TouchableOpacity>

            {emailChecked && (
              <>
                <TextInput
                  placeholder="인증번호 입력"
                  placeholderTextColor="#69728F"
                  style={styles.modalInput}
                  value={resetCode}
                  onChangeText={setResetCode}
                  keyboardType="default"
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleResetCodeCheck}>
                  <Text style={styles.modalButtonText}>코드 확인</Text>
                </TouchableOpacity>
              </>
            )}

            {codeChecked && (
              <>
                <TextInput
                  placeholder="새 비밀번호 입력"
                  placeholderTextColor="#69728F"
                  style={styles.modalInput}
                  value={resetNewPassword}
                  onChangeText={setResetNewPassword}
                  secureTextEntry
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleResetPassword}>
                  <Text style={styles.modalButtonText}>비밀번호 변경</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity onPress={closeResetModal} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default SignInScreen;
