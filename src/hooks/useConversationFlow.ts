import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';

import { useAudioRecording } from '@/src/hooks/useAudioRecording';
import useShowToast from '@/src/hooks/useShowToast';
import { useToken } from '@/src/hooks/useToken';
import { useConversationQuestion, useConversationEnd } from '@/src/queries/useRecordQuery';

export const useConversationFlow = () => {
  const token = useToken();
  const showToast = useShowToast();
  const router = useRouter();
  const { diaryId } = useLocalSearchParams();
  const numericDiaryId = Number(diaryId);

  const {
    isRecording,
    recordedUri,
    setRecordedUri,
    startRecording,
    stopRecording,
  } = useAudioRecording();

  const {
    mutateAsync: questionMutate,
    isPending: isNextPending,
  } = useConversationQuestion();

  const {
    mutateAsync: conversationEndMutate,
    isSuccess,
    isPending: isEndPending,
  } = useConversationEnd();

  const [question, setQuestion] = useState('오늘의 하루는 어땠나요?');
  const [questionButtonEnabled, setQuestionButtonEnabled] = useState(false);
  const [isRecorded, setIsRecorded] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const onPressNextButton = async () => {
    if (!recordedUri) return;
    try {
      const result = await questionMutate({
        token: token!,
        question,
        diaryId: numericDiaryId,
        audioUri: recordedUri,
      });

      if (result?.question) {
        setQuestion(result.question);
        setQuestionButtonEnabled(false);
        setRecordedUri(null);
      }
    } catch {
      showToast('error', '질문 요청 실패', '질문 요청을 다시 시도해주세요.');
    }
  };

  const onPressRecordButton = async () => {
    if (isRecording) {
      const uri = await stopRecording();
      if (uri) {
        setRecordedUri(uri);
        setQuestionButtonEnabled(true);
        setIsRecorded(true);
      }
    } else {
      setQuestionButtonEnabled(false);
      setRecordedUri(null);
      await startRecording();
    }
  };

  const onPressSubmitButton = async () => {
    if (isRecording) return;

    if (!isRecorded) {
      setShowExitModal(true);
      return;
    }

    try {
      await conversationEndMutate({
        token: token!,
        question,
        diaryId: numericDiaryId,
        audioUri: recordedUri ?? undefined,
      });
    } catch {
      showToast('error', '대화 종료 실패', '대화를 다시 시도해주세요.');
      router.push('/record');
    }
  };

  const handleExit = async () => {
    if (isRecording) {
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

  const isNextButtonDisabled = !questionButtonEnabled || isRecording;

  return {
    isRecording,
    isNextPending,
    isEndPending,
    isSuccess,
    numericDiaryId,
    question,
    showExitModal,
    isNextButtonDisabled,
    onPressNextButton,
    onPressRecordButton,
    onPressSubmitButton,
    handleExit,
    closeExitModal,
  };
};
