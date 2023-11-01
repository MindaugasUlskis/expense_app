import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface TabItemProps {
  label: string;
  userCount: number;
}

function TabItem({ label, userCount }: TabItemProps) {
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.tabText}>{label}</Text>
      <View style={styles.rightContent}>
        <Icon name="users" size={24} color="black" />
        <Text>{userCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    height: '10%', // Set a fixed height
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between text and right content
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: 'white',
  },
  tabText: {
    flex: 7, // 70% for text
    fontSize: 16,
  },
  rightContent: {
    flex: 3, // 30% for icon and user count
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TabItem;
