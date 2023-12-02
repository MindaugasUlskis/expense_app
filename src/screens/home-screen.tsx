import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import MainHeader from '../ui/components/main-header';
import TabItem from '../ui/components/tabItem';
import RoomNameModal from '../ui/components/createRoomModal';
import { RoomData, firestoreFunctions } from '../api/database-requests';
import Colors from '../utils/palette';
import Icon from 'react-native-vector-icons/FontAwesome';
import JoinRoomModal from '../ui/components/joinRoomModalProps';
import { RootStackParamList } from './rootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Room'>;
const HomeScreen  = ({ navigation }: { navigation: ScreenNavigationProp }) => {

  const [isCreateRoomModalVisible, setCreateRoomModalVisible] = useState(false);;
  const [isJoinRoomModalVisible, setJoinRoomModalVisible] = useState(false);
  const [rooms, setRooms] = useState<RoomData[]>([]);

 
  useEffect(() => {
    fetchRooms();

  }, []);
  useFocusEffect(

    useCallback(() => {
      fetchRooms();
    }, [])
  );


  const fetchRooms = () => {
    firestoreFunctions.getRoomsByUserId(firestoreFunctions.getCurrentUserId())
      .then((rooms) => {
        setRooms(rooms);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleLogout = () => {
    // Implement your logout logic here
  };

  const handleSettings = () => {
    // Implement your settings logic here
  };

  const toggleCreateRoomModal = () => {
    setCreateRoomModalVisible(!isCreateRoomModalVisible);
  };

  const toggleJoinRoomModal = () => {
    setJoinRoomModalVisible(!isJoinRoomModalVisible);
  };
  const handleCreateRoom = async (roomName: string) => {
    await firestoreFunctions.createRoomFromName(roomName, firestoreFunctions.getCurrentUserId());
    fetchRooms();
  };
  const handleJoinRoom = async (roomId: string) => {
    try {
      const joinResult = await firestoreFunctions.joinRoom(roomId, firestoreFunctions.getCurrentUserId());
      console.log(joinResult);
    } catch (error) {
      console.error('Error joining room:', error);
    }
    fetchRooms();
  };

  const handleNavigation =(item: RoomData) =>{
    navigation.navigate('Room', {item})
  }
  const renderButtons = () => (
    <View style={styles.createRoomContainer}>
      <TouchableOpacity style={styles.squareButton} onPress={toggleCreateRoomModal}>
        <Icon name="plus" size={30} color={Colors.helper1} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.squareButton} onPress={toggleJoinRoomModal}>
        <Icon name="sign-in" size={30} color={Colors.helper1} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <MainHeader renderButtons={renderButtons} />
      <View style={{ flex: 1 }}>
        <ScrollView>
          {rooms.length === 0 ? (
            <View style={styles.emptyRoomsContainer}>
              <Text style={styles.buttonText}>Start your expense tracking by</Text>
              <Text style={styles.buttonText}>adding or joining an expense room</Text>
            </View>
          ) : (
            rooms.map((item, index) => (
              <TabItem key={index} label={item.name} userCount={item.userIds.length} onClick={() => handleNavigation(item)}/>
            ))
          )}
        </ScrollView>
      </View>
      <RoomNameModal isVisible={isCreateRoomModalVisible} onClose={toggleCreateRoomModal} onCreateRoom={handleCreateRoom} />
      <JoinRoomModal isVisible={isJoinRoomModalVisible} onClose={toggleJoinRoomModal} onJoinRoom={handleJoinRoom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  listContainer: {
    flex: 1, // 70% of available space
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    justifyContent: 'center'
  },
  listContainerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  createRoomContainer: {
    flex: 0.5,
    flexDirection: 'column', // 10% of available space
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  squareButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 50, // Make it a square with rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    width: 60,
    height: 60,
    elevation: 10,
  },
  buttonText: {
    fontSize: Colors.fontsize2, // Assuming Colors.fontsize1 is defined
    color: Colors.helper1,
    fontFamily: Colors.font1,
    elevation: 10,
  },
  emptyRoomsContainer: {
    height:250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});




export default HomeScreen;
