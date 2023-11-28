import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RootStackParamList } from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import Colors from '../utils/palette';
import { StackNavigationProp } from '@react-navigation/stack';
import { PieChart } from 'react-native-chart-kit';
import { calculateTotalAmountByCategory, calculateTotalAmountByUser, calculateBudgetWastedPercentage, calculatePercentageSpent } from '../utils/functions/calculateChardData';
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type OverviewScreenRouteProp = RouteProp<RootStackParamList, 'Overview'>;

const OverviewScreen = ({ route, navigation }: { route: OverviewScreenRouteProp,  navigation: ScreenNavigationProp  }) => {
    const [item, setItem] = useState(route.params?.item);
    const [listings, setListings] = useState(route.params?.listings);
    const [currentExpenses, setCurrentExpenses] = useState(route.params?.currentExpenses);
    

      console.log(calculateTotalAmountByCategory(listings))
      console.log(calculateTotalAmountByUser(listings))
      console.log(calculateBudgetWastedPercentage(calculateTotalAmountByCategory(listings), item.allBudget))
      console.log(calculatePercentageSpent(currentExpenses, item.allBudget))

      const totalAmountByCategory = calculateTotalAmountByCategory(listings);
      const totalAmountByUser = calculateTotalAmountByUser(listings);
    

     
      return (
        <View>
          {/* Pie Chart for Total Amount by Category */}
          <Text>Total Amount by Category</Text>
          <PieChart
            data={totalAmountByCategory.map((dataPoint) => ({
              name: dataPoint.category,
              value: dataPoint.totalAmount,
              color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
            }))}
            width={300}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="value" // Add accessor property
            backgroundColor="transparent" // Add backgroundColor property
            paddingLeft="15" // Add paddingLeft property
          />
    
          {/* Pie Chart for Total Amount by User */}
          <Text>Total Amount by User</Text>
          <PieChart
            data={totalAmountByUser.map((dataPoint) => ({
              name: dataPoint.user,
              value: dataPoint.totalAmount,
              color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
            }))}
            width={300}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            }}
            accessor="value" // Add accessor property
            backgroundColor="transparent" // Add backgroundColor property
            paddingLeft="15" // Add paddingLeft property
          />
        </View>
      );
};


export default OverviewScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary,
    },
  });
  
  