import React, { useState } from 'react';
import { View, Modal, Text, TextInput, Button, StyleSheet } from 'react-native';

interface RoomNameModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCreateRoom: (roomName: string) => void;
}

const RoomNameModal: React.FC<RoomNameModalProps> = ({ isVisible, onClose, onCreateRoom }) => {
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = () => {
    if (roomName) {
      onCreateRoom(roomName);
      setRoomName('');
      onClose();
    }
  };

  return (
    <Modal transparent animationType="slide" visible={isVisible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>How would you like to name your expense room?</Text>
          <TextInput
            style={styles.input}
            value={roomName}
            onChangeText={(text) => setRoomName(text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onClose} color="#E74C3C" style={styles.button} />
            <View style={styles.buttonGap} />
            <Button title="Create" onPress={handleCreateRoom} color="#2ECC71" style={styles.button} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%', // Adjust the width to make the buttons less wide
  },
  buttonGap: {
    width: '10%', // Adjust the width to control the gap between the buttons
  },
});

export default RoomNameModal;
