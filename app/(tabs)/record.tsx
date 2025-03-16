import React, { useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SelectModeTab from '@/components/SelectModeTab';
import { recordScreenStyles } from '@/styles/recordScreenStyles';
import Monologue from '@/components/Monologue';
import Conversation from '@/components/Conversation';

function RecordScreen() {
  const [ mode, setMode ] = useState<string | null>(null);

  return (
    <GestureHandlerRootView style={recordScreenStyles.container}>
      { mode === 'MonologueMode' && <Monologue />}
      { mode === 'ConversationMode' && <Conversation />}
      <SelectModeTab setMode={setMode} />
    </GestureHandlerRootView>
  );
};

export default RecordScreen;
