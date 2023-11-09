import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/palette';
interface MainHeaderProps {
  renderButtons?: () => ReactNode;
}
const MainHeader: React.FC<MainHeaderProps> = ({ renderButtons }) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText1}>My Expense</Text>
        <Text style={styles.headerText2}>Rooms</Text>
      </View>
      {renderButtons && renderButtons()}
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
    backgroundColor: 'transparent', // Set background color to transparent
  },
  headerText1: {
    fontSize: 28,
    color: Colors.helper1,
    fontFamily: Colors.text1,
    elevation: 10
  },
  headerText2: {
    fontSize: 34,
    fontWeight: 'bold', // Make the second line bold, adjust as needed
    color: Colors.helper1,
    fontFamily: Colors.text1,
    elevation: 10
  },
  addButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 50,
  },
});



export default MainHeader;
