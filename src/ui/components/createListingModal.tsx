import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../../utils/palette';
import { RoomData } from '../../api/database-requests';
import { firestoreFunctions } from '../../api/database-requests'
interface CreateListingModalProps {
    isVisible: boolean;
    onClose: () => void;
    onCreateListing: (number: number, category: string, userId: string ,roomId: string,) => void;
    categories: string[]; // List of available categories
    item: RoomData
}


const CreateListingModal: React.FC<CreateListingModalProps> = ({ isVisible, onClose, onCreateListing, categories, item }) => {
    const [number, setNumber] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const handleNumberChange = (text: string) => {
        // Use regular expression to allow positive and negative numbers
        const numberRegex = /^[-+]?\d*\.?\d*$/;
        if (numberRegex.test(text)) {
            // Remove leading '+' if present
            const cleanText = text.replace(/^\+/, '');
            // If the input is a valid number, update the state.
            setNumber(parseFloat(cleanText));
        }
    };
    const handleCreateListing = () => {
        if (!isNaN(number) && selectedCategory && number !== 0) {
            onCreateListing(number, selectedCategory, firestoreFunctions.getCurrentUserId(),  item.id,);
            setNumber(0); // Set the input field back to 0
            onClose();
        } else {
            // Handle invalid number input (e.g., show an error message)
            console.log('Invalid number input');
            // You might want to provide user feedback about invalid input
        }
    };

    return (
        <Modal transparent animationType="slide" visible={isVisible}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.input}
                        value={number === undefined ? '' : number.toString()}
                        onChangeText={handleNumberChange}
                        keyboardType="numeric"
                        placeholder="Number (Positive or Negative)"
                    />
                    <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        items={categories.map(category => ({ label: category, value: category }))}
                        onValueChange={(value: string) => setSelectedCategory(value)}
                        value={selectedCategory}
                        style={{inputAndroid:{color:Colors.secondary, fontWeight:'bold',elevation:10}}}
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
        width: '60%', // Adjust the width as per your preference
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: Colors.helper1,
        fontSize: 18, // Increase the font size
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
        width: '60%', // Adjust the width for the picker container
        marginBottom: 10,
    },
});



export default CreateListingModal;
