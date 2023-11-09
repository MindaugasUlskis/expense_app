import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/palette';

interface TabItemProps {
  label: string;
  userCount: number;
}

function TabItem({ label, userCount }: TabItemProps) {
  return (
    <View style={styles.tabContainer}>
      <Text style={styles.tabText}>{label}</Text>
      <View style={styles.rightContent}>
        <Icon name="users" size={24} color="white" />
        <Text style={styles.userCountText}>{userCount}</Text>
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
    borderColor: 'transparent',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: Colors.secondary,
  },
  tabText: {
    flex: 7,
    fontSize: Colors.fontsize2,
    color: Colors.helper1,
  },
  rightContent: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCountText: {
    fontSize: 20,
    color: 'white',
  },
});

export default TabItem;
