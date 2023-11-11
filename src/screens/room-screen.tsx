import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { generateDateCode } from '../utils/functions/dateCodeGenerator';
import { ListingData, firestoreFunctions } from '../api/database-requests';
import ExpenseRoomHeader from '../ui/components/expense-room-header';
import Colors from '../utils/palette';
import SplitNumberDisplay from '../ui/components/split-number-display';
import Icon from 'react-native-vector-icons/FontAwesome';
import CreateListingModal from '../ui/components/createListingModal';

type RoomScreenRouteProp = RouteProp<RootStackParamList, 'Room'>;

const RoomScreen = ({ route }: { route: RoomScreenRouteProp }) => {
    const [isCreateRoomModalVisible, setCreateRoomModalVisible] = useState(false);;
    const [item, setItem] = useState(route.params?.item);
    const currentDateCode = generateDateCode();
    const [listings, setListings] = useState<ListingData[]>([]);

    const fetchListings = async () => {
      try {
        const roomID = item.id;
        const dateCode = item.linstingDateCode;
  
        const fetchedListings = await firestoreFunctions.getListingsByRoomIdAndDateCode(roomID, dateCode);
  
        // Use the fetched listings
        setListings(fetchedListings);
        console.log('fetched listings')
        console.log(`listing count ${fetchedListings.length}`)
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };


  const toggleCreateAListing = () => {
    setCreateRoomModalVisible(!isCreateRoomModalVisible);
  };

  const handleCreateListing = async (amount: number, category: string, userId: string, roomId: string  ) => {
    try {
     firestoreFunctions.createListing(amount, userId, category, roomId)
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

    useEffect(() => {
        async function fetchData() {
            const roomsListingCode = await firestoreFunctions.getListingDateCodeByRoomId(item.id);
            if (roomsListingCode && currentDateCode !== roomsListingCode) {
                await firestoreFunctions.createOldRoomFromRoomData(item);
                await firestoreFunctions.updateRoomData(item);
                const updatedItem = await firestoreFunctions.getRoomByRoomId(item.id);
                setItem(updatedItem);
                fetchListings();
            }
        }

        fetchData();
        fetchListings();
    }, [item]);
    const renderButtons = () => (
        <View style={styles.createRoomContainer}>
          <TouchableOpacity style={styles.squareButton} onPress={toggleCreateAListing}>
            <Icon name="plus" size={30} color={Colors.helper1} />
          </TouchableOpacity>
        </View>
      );

    return (
        <View style={styles.container}>
            <ExpenseRoomHeader text={item.name} renderButtons={renderButtons}/>
            <SplitNumberDisplay leftNumber={2550} rightNumber={3500}></SplitNumberDisplay>
            {listings.map((listing) => (
  <Text key={listing.id}>{listing.amount}</Text>
))}
            <CreateListingModal isVisible={isCreateRoomModalVisible} onClose={toggleCreateAListing} onCreateListing={handleCreateListing} categories={['Car', 'Bills', 'Groceries', ]} item={item} />
        </View>
    );
}

export default RoomScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary,
    },
    listContainer: {
      flex: 1, // 70% of available space
      alignItems: 'center',
      alignSelf: 'center',
      width: '90%',
      justifyContent: 'center'
    },
    listContainerContent: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    createRoomContainer: {
      flex: 0.5,
      flexDirection: 'column', // 10% of available space
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    squareButton: {
      backgroundColor: Colors.secondary,
      borderRadius: 50, // Make it a square with rounded corners
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      marginVertical: 8,
      width: 60,
      height: 60,
      elevation: 10,
    },
    buttonText: {
      fontSize: Colors.fontsize2, // Assuming Colors.fontsize1 is defined
      color: Colors.helper1,
      fontFamily: Colors.font1,
      elevation: 10,
    },
    emptyRoomsContainer: {
      height:250,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  