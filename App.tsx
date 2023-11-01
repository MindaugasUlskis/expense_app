import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import { firestoreFunctions } from './src/api/database-requests';
import { UserData, RoomData, CategoryData, ListingData } from './src/api/database-requests';
import { inputMockData } from './src/api/mock-data';
import { generateDateCode } from './src/utils/functions/dateCodeGenerator';
import { getMonthName } from './src/utils/functions/monthNumberToWord';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/home-screen';
import LoginScreen from './src/screens/login-screens';

const Stack = createStackNavigator();
function App() {
  const handleButtonClick = async () => {
    console.log("LALALALALALA")
    const aray = await firestoreFunctions.getListingsByRoomId('11111')

    console.log(aray)


    const currentDate = new Date()
    console.log(currentDate)
    console.log(currentDate.toLocaleTimeString())
    console.log(currentDate.toLocaleDateString())

    console.log("LALALALALALA")
    console.log(generateDateCode())
    console.log("LALALALALALA")
    console.log(getMonthName(1))
    console.log(getMonthName(2))
    console.log(getMonthName(3))
    console.log(getMonthName(4))
    console.log(getMonthName(5))
    console.log(getMonthName(7))
    console.log(getMonthName(12, false))

  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

// inputMockData()
// console.log(firestoreFunctions.getCategories())
// console.log(firestoreFunctions.getRooms())
// console.log(firestoreFunctions.getUsers())
// console.log(firestoreFunctions.getListings())