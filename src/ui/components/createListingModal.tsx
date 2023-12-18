import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../../utils/palette';
import { RoomData } from '../../api/database-requests';
import { firestoreFunctions } from '../../api/database-requests'
interface CreateListingModalProps {
    isVisible: boolean;
    onClose: () => void;
    onCreateListing: (number: number, category: string, userId: string, roomId: string,) => void;
    categories: string[];
    item: RoomData
}


const CreateListingModal: React.FC<CreateListingModalProps> = ({ isVisible, onClose, onCreateListing, categories, item }) => {
    const [number, setNumber] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);


    const handleCreateListing = () => {
        if (!isNaN(number) && number > 0) {
            onCreateListing(number, selectedCategory, firestoreFunctions.getCurrentUserId(), item.id,);
            setNumber(0);
            onClose();
        } else {

            console.log('Invalid number input');
        }
    };

    return (
        <Modal transparent animationType="slide" visible={isVisible}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.input}
                        value={number === 0 ? '' : number.toString()}
                        onChangeText={(value) => {
                            const numericValue = parseInt(value, 10);
                            setNumber(isNaN(numericValue) ? 0 : numericValue);
                        }}
                        keyboardType="numeric"
                    />
                    <View style={styles.pickerContainer}>
                        <RNPickerSelect
                            items={categories.map(category => ({ label: category, value: category }))}
                            onValueChange={(value: string) => setSelectedCategory(value)}
                            value={selectedCategory}
                            style={{ inputAndroid: { color: Colors.secondary, fontWeight: 'bold', elevation: 10 } }}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={onClose}
                            style={[styles.button, { backgroundColor: Colors.secondary }]}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonGap} />
                        <TouchableOpacity
                            onPress={handleCreateListing}
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
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    input: {
        width: '60%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: Colors.helper1,
        fontSize: 18,
        backgroundColor: 'white',
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
    pickerContainer: {
        width: '60%',
        marginBottom: 10,
    },
});



export default CreateListingModal;
