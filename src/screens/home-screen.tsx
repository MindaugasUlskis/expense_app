import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Header from '../ui/components/header';
import TabItem from '../ui/components/tabItem';
import RoomNameModal from '../ui/components/createRoomModal';
import { firestoreFunctions } from '../api/database-requests';

function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  
  const handleLogout = () => {
    // Implement your logout logic here
  };

  const handleSettings = () => {
    // Implement your settings logic here
  };
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCreateRoom = (roomName: string) => {
    
    firestoreFunctions.createRoomFromName(roomName, firestoreFunctions.getCurrentUserId())
  };

  return (
    <View style={styles.container}>
     {/* <Header onLogout={handleLogout} onSettings={handleSettings} /> */}
      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContainerContent}>
        {mockData.map((item, index) => (
          <TabItem key={index} label={item.label} userCount={item.userCount} />
        ))}
      </ScrollView>
      <View style={styles.createRoomContainer}>
        <TouchableOpacity style={styles.createRoomButton}  onPress={toggleModal}>
          <Text>Create a Room</Text>
          
        </TouchableOpacity>
        <RoomNameModal isVisible={isModalVisible} onClose={toggleModal} onCreateRoom={handleCreateRoom} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    flex: 8, // 80% of available space
  },
  listContainerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  createRoomContainer: {
    flex: 0.5, // 20% of available space
    justifyContent: 'center',
    alignItems: 'center',
  },
  createRoomButton: {
    backgroundColor: 'blue',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default HomeScreen;
const mockData = [
  { label: 'Tab 1', userCount: 5 },
  { label: 'Tab 2', userCount: 7 },
  { label: 'Tab 3', userCount: 2 },
  { label: 'Tab 4', userCount: 8 },
  { label: 'Tab 5', userCount: 4 },
  { label: 'Tab 6', userCount: 6 },
  { label: 'Tab 7', userCount: 3 },
  { label: 'Tab 8', userCount: 9 },
  { label: 'Tab 9', userCount: 1 },
  { label: 'Tab 10', userCount: 0 },
];

