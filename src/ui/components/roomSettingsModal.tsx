import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../utils/palette';
import { RoomData } from '../../api/database-requests';

interface RoomSettingsModalProps {
    isVisible: boolean;
    currentBudget: number
    onClose: () => void;
    onLeave: () => void;
    onbudgetChange: (budget: number) => void;
    item: RoomData
}

const RoomSettingsModal: React.FC<RoomSettingsModalProps> = ({ isVisible, onClose, onLeave, onbudgetChange, currentBudget, item }) => {
    const [budget, setBudget] = useState(currentBudget.toString());

    return (
        <Modal transparent animationType="slide" visible={isVisible}>
            <View style={[styles.overlay,]}>
                <View style={styles.modalContainer}>
                    <Text style={[styles.modalText, { color: Colors.helper1, textAlign: 'justify', marginBottom: 10 }]}>
                        Set new budget for this room
                    </Text>
                    <View style={{ flexDirection: 'row', width: '65%', alignItems: 'center', justifyContent: 'center', }}>
                        <TextInput
                            inputMode='numeric'
                            style={styles.input}
                            value={budget}
                            onChangeText={(value) => setBudget(value)}
                            placeholder={currentBudget.toString()}
                        />
                        <TouchableOpacity
                            onPress={() => onbudgetChange(parseFloat(budget))}
                            style={[styles.button, { backgroundColor: Colors.secondary, marginBottom: 10, marginLeft: 10 }]}
                        >
                            <Text style={styles.buttonText}>save</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.modalText, { color: Colors.helper1, textAlign: 'justify', marginBottom: 10 }]}>
                        Invite code for this room is
                    </Text>
                    <Text style={[styles.inviteText]}>
                           {item.inviteId}
                    </Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={onLeave}
                            style={[styles.button, { backgroundColor: Colors.secondary, marginVertical: 10, width: "100%" }]}
                        >
                            <Text style={styles.buttonText}>Leave this Room</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onClose}
                            style={[styles.button, { backgroundColor: Colors.secondary, }]}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
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
    inviteText: {
        fontSize: 18,
        paddingHorizontal: 25,
        fontWeight: 'bold',
        color: Colors.secondary,
        textAlign: 'justify',
        backgroundColor:'white',
        padding: 10,
        borderRadius: 10
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
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 10,
        alignItems: 'center'
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

export default RoomSettingsModal;
