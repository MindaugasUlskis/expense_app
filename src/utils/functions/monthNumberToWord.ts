import React from 'react';
import { View, Text } from 'react-native';

export const getMonthName = (monthNumber: string, full: boolean = true): string => {



    const date = new Date(2000, Number(monthNumber) - 1);
    const options: Intl.DateTimeFormatOptions = { month: full ? 'long' : 'short' };
    return date.toLocaleString('en-US', options);
  }