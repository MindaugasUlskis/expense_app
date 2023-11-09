import { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../utils/palette";


interface JoinRoomModalProps {
    isVisible: boolean;
    onClose: () => void;
    onJoinRoom: (roomId: string) => void;
  }
  
  const JoinRoomModal: React.FC<JoinRoomModalProps> = ({ isVisible, onClose, onJoinRoom }) => {
    const [roomId, setRoomId] = useState('');
  
    const handleJoinRoom = () => {
      if (roomId) {
        onJoinRoom(roomId);
        setRoomId('');
        onClose();
      }
    };
  
    return (
      <Modal transparent animationType="slide" visible={isVisible}>
        <View style={[styles.overlay,]}>
          <View style={styles.modalContainer}>
            <Text style={[styles.modalText, { color: Colors.helper1, textAlign: 'justify', marginBottom: 0 }]}>
              Enter the Room ID
            </Text>
            <TextInput
              style={styles.input}
              value={roomId}
              onChangeText={(text) => setRoomId(text)}
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
                onPress={handleJoinRoom}
                style={[styles.button, { backgroundColor: Colors.secondary }]}
              >
                <Text style={styles.buttonText}>Join</Text>
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
  
  export default JoinRoomModal;
  