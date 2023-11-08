import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/palette';

const MainHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>My Expense Rooms</Text>
      <TouchableOpacity style={styles.addButton}>
        <Icon name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#903749', 
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    borderBottomRightRadius: 50,
  },
  headerText: {
    fontSize: 24,
    color: Colors.text1,
  },
  addButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 50,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default MainHeader;
