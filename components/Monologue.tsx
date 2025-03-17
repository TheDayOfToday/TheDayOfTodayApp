import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { recordScreenStyles } from '@/styles/recordScreenStyles';
import SelectMoodTab from './SelectMoodtab';

interface MonologueProps {
  setMode: (mode: string) => void;
};

function Monologue({setMode}: MonologueProps) {
  const [isOpenMoodTab, setOpenMoodTab] = useState(false);

  const handleOpenMoodTab = () => setOpenMoodTab(true);
  const handleCloseMoodTab = () => setOpenMoodTab(false);

  const onPressSubmitButton = () => {
    setMode('');
    handleOpenMoodTab();
  }

  return(
    <View style={recordScreenStyles.recordScreen}>
      <Text style={recordScreenStyles.message}>당신의 하루를 들려주세요</Text>
      <Text>{'독백'}</Text>
      <Pressable
        style={recordScreenStyles.submitButton}
        onPress={onPressSubmitButton}
      >
        <Text style={recordScreenStyles.submitButtonText}>마침</Text>
      </Pressable>
      <SelectMoodTab
        isOpen={isOpenMoodTab}
        onClose={handleCloseMoodTab}
      />
    </View>
  );
};

export default Monologue;
