import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
export const showError = (message: string) => {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Error',
      text2: message,
      visibilityTime: 4000,
    });
  };