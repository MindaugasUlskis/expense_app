import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import { firestoreFunctions } from './src/api/database-requests';
import { UserData, RoomData, CategoryData, ListingData } from './src/api/database-requests';
import { inputMockData } from './src/api/mock-data';


function App() {
  const handleButtonClick =async () => {
    console.log("LALALALALALA")
const aray = await firestoreFunctions.getListingsByRoomId('11111')
console.log(aray)



  };

  return (
    <View style={styles.container}>
      <Button title="Click Me" onPress={handleButtonClick} />
    </View>
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