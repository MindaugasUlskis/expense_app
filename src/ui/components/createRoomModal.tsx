import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../utils/palette';

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
      <View style={[styles.overlay,]}>
        <View style={styles.modalContainer}>
          <Text style={[styles.modalText, { color: Colors.helper1, textAlign: 'justify', marginBottom: 0 }]}>
            How would you like to name your
          </Text>
          <Text style={[styles.modalText, { color: Colors.helper1, textAlign: 'justify' }]}>
          expense room?
          </Text>
          <TextInput
            style={styles.input}
            value={roomName}
            onChangeText={(text) => setRoomName(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, { backgroundColor: Colors.secondary }]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <View style={styles.buttonGap} />
            <TouchableOpacity
              onPress={handleCreateRoom}
              style={[styles.button, { backgroundColor: Colors.secondary }]}
            >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: Colors.helper1,
    backgroundColor: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    width: '35%',
    borderRadius: 15,
    padding: 10,
    elevation: 10
  },
  buttonText: {
    color: Colors.helper1,
    textAlign: 'center',
  },
  buttonGap: {
    width: '10%',
  },
});

export default RoomNameModal;
