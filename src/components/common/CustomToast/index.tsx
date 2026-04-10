import React from 'react';
import { BaseToast, BaseToastProps } from 'react-native-toast-message';

import { toastStyles } from '@/src/styles/toastStyles';

type CustomToastProps = BaseToastProps & {
  type: 'success' | 'error' | 'info';
};

const CustomToast = ({ type, ...props }: CustomToastProps) => {
  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return '#87CEFA';
      case 'error':
        return '#F08080';
      case 'info':
        return '#faee87';
      default:
        return '#ccc';
    }
  };

  return (
    <BaseToast
      {...props}
      style={[
        toastStyles.container,
        { borderLeftColor: getBorderColor() },
      ]}
      text1Style={toastStyles.titleText}
      text2Style={toastStyles.messageText}
    />
  );
};

export default CustomToast;
