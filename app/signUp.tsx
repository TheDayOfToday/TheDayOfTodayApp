import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';

import { LoadingScreen } from '@/src/components/common/Loading';
import { useEmailVerification } from '@/src/hooks/useEmailVerification';
import { styles } from '@/src/styles/signUpStyles';

function SignUpScreen() {
  const {
    isPending,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    handlePhoneNumberChange,
    emailSent,
    emailCode,
    setEmailCode,
    emailVerified,
    handleSendCode,
    handleCheckCode,
    handleSubmit,
  } = useEmailVerification();

  return (
    <>
      {isPending ? <LoadingScreen backgroundColor='#17171E'/> : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>오늘의 하루</Text>
          <Text style={styles.signUpLabel}>회원가입</Text>

          <TextInput
            placeholder="이름"
            placeholderTextColor="#69728F"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <View style={styles.emailContainer}>
            <TextInput
              placeholder="이메일"
              placeholderTextColor="#69728F"
              style={styles.inputEmail}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Pressable style={styles.authButton} onPress={handleSendCode}>
              <Text style={styles.authText}>인증하기</Text>
            </Pressable>
          </View>

          {emailSent && (
            <View style={styles.emailContainer}>
              <TextInput
                placeholder="인증번호 입력"
                placeholderTextColor="#69728F"
                style={styles.inputEmail}
                value={emailCode}
                onChangeText={setEmailCode}
                keyboardType="numeric"
              />
              <Pressable style={styles.authButton} onPress={handleCheckCode}>
                <Text style={styles.authText}>코드 확인</Text>
              </Pressable>
            </View>
          )}

          <TextInput
            placeholder="비밀번호"
            placeholderTextColor="#69728F"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={emailVerified}
          />

          <TextInput
            placeholder="전화번호"
            placeholderTextColor="#69728F"
            style={styles.input}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>가입하기</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
}

export default SignUpScreen;
