
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { RootStackParamList } from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';


type RoomScreenRouteProp = RouteProp<RootStackParamList, 'Room'>;

const RoomScreen = ({ route }: { route: RoomScreenRouteProp }) => {
  // Access the passed 'item' parameter from the route
  const item = route.params?.item;

  return (
    <View >
      {/* Use the 'item' data as needed in your RoomScreen component */}
      <Text>Label: {item.name}</Text>
      <Text>User Count: {item.id}</Text>
    </View>
  );
}

export default RoomScreen;
