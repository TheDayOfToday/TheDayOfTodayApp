import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { useState, useEffect, useCallback, useRef } from 'react';
import { BackHandler } from 'react-native';

import useShowToast from '@/src/hooks/useShowToast';
import { usePostMonologue } from '@/src/queries/useRecordQuery';

const recordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: 2,
    audioEncoder: 3,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.m4a',
    audioQuality: 2,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  web: {
    mimeType: 'audio/webm',
    bitsPerSecond: 128000,
  },
};

export const useMonologue = () => {
  const router = useRouter();
  const showToast = useShowToast();
  const [showExitModal, setShowExitModal] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const isRecordingRef = useRef(false);
  const { mutate: sendMonologue, data, isSuccess, isPending } = usePostMonologue();

  const stopRecording = useCallback(async (): Promise<string | null> => {
    if (!recordingRef.current) return null;

    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      recordingRef.current = null;
      isRecordingRef.current = false;
      return uri;
    } catch {
      return null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(recordingOptions);
      await newRecording.startAsync();
      recordingRef.current = newRecording;
      isRecordingRef.current = true;
    } catch {
      stopRecording();
      showToast('error', '녹음 실패', '독백 서비스를 다시 시도해주세요.');
      router.push('/record');
    }
  }, [stopRecording, showToast, router]);

  const onPressSubmitButton = async () => {
    if (!isRecordingRef.current) {
      showToast('error', '서비스 에러', '독백 서비스를 다시 시도해주세요.');
      router.push('/record');
      return;
    }
    const uri = await stopRecording();
    if (!uri) return;

    sendMonologue(uri);
  };

  useEffect(() => {
    startRecording();
    return () => {
      stopRecording();
    };
  }, [startRecording, stopRecording]);

  const handleExit = async () => {
    if (isRecordingRef.current) {
      await stopRecording();
    }
    router.back();
    setShowExitModal(false);
  };

  const closeExitModal = () => setShowExitModal(false);

  useEffect(() => {
    const backAction = () => {
      setShowExitModal(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return {
    isPending,
    isSuccess,
    diaryId: data?.diaryId,
    showExitModal,
    onPressSubmitButton,
    handleExit,
    closeExitModal,
  };
};
