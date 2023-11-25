import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/palette';

interface ComponentProps {
  leftNumber: number;
  rightNumber: number;
}

const SplitNumberDisplay: React.FC<ComponentProps> = ({ leftNumber, rightNumber }) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>


      </View>
      <View style={styles.row}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text style={styles.label}>Expenses</Text>
          <Text style={styles.number}>{leftNumber}</Text>
        </View>

        <View style={styles.lineVertical}></View>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text style={styles.label}>Budget</Text>
          <Text style={styles.number}>{rightNumber}</Text>
        </View>
      </View>
      <View style={styles.lineHorizontal}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '57%',
  },
  label: {
    fontSize: 16,
    color: Colors.helper1,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 20,
    marginHorizontal: "15%",
    elevation: 10,
    color: Colors.helper1,
    fontWeight: 'bold',
  },
  lineVertical: {
    width: 2,
    height: 35,
    backgroundColor: Colors.secondary,
  },
  lineHorizontal: {
    width: '60%',
    height: 1,
    backgroundColor: Colors.secondary,
    marginVertical: 10,
  },
});

export default SplitNumberDisplay;
