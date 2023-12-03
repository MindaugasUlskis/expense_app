import React from 'react';
import { firestoreFunctions } from './src/api/database-requests';
import { generateDateCode } from './src/utils/functions/dateCodeGenerator';
import { getMonthName } from './src/utils/functions/monthNumberToWord';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/home-screen';
import LoginScreen from './src/screens/login-screens';
import  Toast  from 'react-native-toast-message';
import RoomScreen from './src/screens/room-screen';
import { StyleSheet } from 'react-native';
import OverviewScreen from './src/screens/overview-screen';

const Stack = createStackNavigator();
function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Room"
          component={RoomScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Overview"
          component={OverviewScreen}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </>
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
