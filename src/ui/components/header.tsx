import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

interface HeaderProps {
  onLogout: () => void;
  onSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onSettings }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const showDropdown = () => {
    setIsDropdownVisible(true);
  };

  const hideDropdown = () => {
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Expense Rooms</Text>
      <TouchableOpacity onPress={showDropdown}>
        <Text style={styles.dropdownButton}>Dropdown</Text>
      </TouchableOpacity>
      <Modal visible={isDropdownVisible} transparent animationType="slide">
        <View style={styles.dropdown}>
          <Button title="Log Out" onPress={onLogout} />
          <Button title="Settings" onPress={onSettings} />
          <Button title="Close" onPress={hideDropdown} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dropdownButton: {
    fontSize: 18,
  },
  dropdown: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Header;
