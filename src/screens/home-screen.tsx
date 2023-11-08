import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MainHeader from '../ui/components/main-header';
import TabItem from '../ui/components/tabItem';
import RoomNameModal from '../ui/components/createRoomModal';
import { RoomData, firestoreFunctions } from '../api/database-requests';
import Colors from '../utils/palette';

function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [rooms, setRooms] = useState<RoomData[]>([]);

  useEffect(() => {
    // Fetch rooms when the component mounts
    firestoreFunctions.getRoomsByUserId(firestoreFunctions.getCurrentUserId())
      .then((rooms) => {
        setRooms(rooms);
        console.log('Rooms for user', firestoreFunctions.getCurrentUserId(), ':', rooms);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

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
    firestoreFunctions.createRoomFromName(roomName, firestoreFunctions.getCurrentUserId());
  };

 return (
    <View style={styles.container}>
      <MainHeader /> 
      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContainerContent}>
        {rooms.length === 0 ? (
          <View style={styles.emptyRoomsContainer}>
            <TouchableOpacity style={styles.createRoomButton} onPress={toggleModal}>
              <Text>Create a Room</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createRoomButton} onPress={() => console.log('Join a Room')}>
              <Text>Join a Room</Text>
            </TouchableOpacity>
          </View>
        ) : (
          rooms.map((item, index) => (<TabItem key={index} label={item.name} userCount={item.userIds.length} />))
        )}
        <View>
          <TouchableOpacity style={styles.createRoomButton} onPress={toggleModal}>
            <Text>Create a Room</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createRoomButton} onPress={() => console.log('Join a Room')}>
            <Text>Join a Room</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.createRoomContainer}>
        <RoomNameModal isVisible={isModalVisible} onClose={toggleModal} onCreateRoom={handleCreateRoom} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
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
    backgroundColor: Colors.helper1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
  },
  emptyRoomsContainer: {
    alignItems: 'center',
  },
});

export default HomeScreen;
