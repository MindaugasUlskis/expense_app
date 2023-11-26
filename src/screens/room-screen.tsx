import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RootStackParamList } from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { generateDateCode } from '../utils/functions/dateCodeGenerator';
import { ListingData, firestoreFunctions } from '../api/database-requests';
import ExpenseRoomHeader from '../ui/components/expense-room-header';
import Colors from '../utils/palette';
import SplitNumberDisplay from '../ui/components/split-number-display';
import Icon from 'react-native-vector-icons/FontAwesome';
import CreateListingModal from '../ui/components/createListingModal';
import ListingItem from '../ui/components/listing-tab-item';
import RoomSettingsModal from '../ui/components/roomSettingsModal';
import { StackNavigationProp } from '@react-navigation/stack';
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type RoomScreenRouteProp = RouteProp<RootStackParamList, 'Room'>;

const RoomScreen = ({ route, navigation }: { route: RoomScreenRouteProp,  navigation: ScreenNavigationProp  }) => {
    const [isCreateRoomModalVisible, setCreateRoomModalVisible] = useState(false);;
    const [isRoomSettingsModalVisible, setRoomSettingsModalVisible] = useState(false);;
    const [item, setItem] = useState(route.params?.item);
    const currentDateCode = generateDateCode();
    const [listings, setListings] = useState<ListingData[]>([]);
    const [currentBudget, setCurrentBudget] = useState(0);
    const [currentExpenses, setCurrentExpenses] = useState(0);
    const fetchListings = async () => {
      try {
        const roomID = item.id;
        const dateCode = item.linstingDateCode;
  
        const fetchedListings = await firestoreFunctions.getListingsByRoomIdAndDateCode(roomID, dateCode);
        const totalAmount = fetchedListings.reduce((acc, listing) => acc + listing.amount, 0);
        setListings(fetchedListings);
        setCurrentExpenses(totalAmount)
        console.log(`Total amount: ${totalAmount}`);

        console.log('fetched listings')
        console.log(`listing count ${fetchedListings.length}`)
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };


  const toggleCreateAListing = () => {
    setCreateRoomModalVisible(!isCreateRoomModalVisible);
  };
  const toggleRoomSettings = () => {
    setRoomSettingsModalVisible(!isRoomSettingsModalVisible);
  };

  const handleCreateListing = async (amount: number, category: string, userId: string, roomId: string  ) => {
    try {
     firestoreFunctions.createListing(amount, userId, category, roomId)
    } catch (error) {
      console.error('Error joining room:', error);
    }
    fetchListings();
  };

  const  handleDeleteListing = async (docId: string, collection: string) => {
    try {
      firestoreFunctions.deleteDocumentByIdAttribute(docId, collection)
     } catch (error) {
       console.error('Error removing listing:', error);
     }
     fetchListings();
  };
  const  handleBudgetChange = async (budget: number) => {
    try {
      firestoreFunctions.updateDocumentBudgetByIdAttribute(item.id, budget, 'Rooms')
      item.allBudget = budget
      toggleRoomSettings()
     } catch (error) {
       console.error('Error removing listing:', error);
     }
     
  };
  const  handleUserLeave = async () => {
    try {
      firestoreFunctions.updateUserArrayInRoom(item.id, firestoreFunctions.getCurrentUserId())
      navigation.navigate('Home')

     } catch (error) {
       console.error('Error while leaving the room:', error);
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
          <TouchableOpacity style={styles.squareButton} onPress={toggleRoomSettings}>
            <Icon name="cog" size={30} color={Colors.helper1} />
          </TouchableOpacity>
        </View>
      );

      return (
        <View style={styles.container}> 
          <ExpenseRoomHeader text={item.name} renderButtons={renderButtons} />
          <SplitNumberDisplay leftNumber={currentExpenses} rightNumber={item.allBudget} />
          <ScrollView style={{ paddingTop: 10, flex: 1, maxHeight:'75%' }}>
            <View style={styles.listContainer}>
              {listings.map((listing) => (
                <ListingItem key={listing.id} data={listing} onDelete={()=> handleDeleteListing(listing.id, 'Listings')} />
              ))}
            </View>
          </ScrollView>
          <View style={styles.centeredButtonContainer} >
          <TouchableOpacity style={styles.squareButton} onPress={toggleCreateAListing}>
            <Icon name="plus" size={30} color={Colors.helper1} />
          </TouchableOpacity>
        </View>
          <CreateListingModal
            isVisible={isCreateRoomModalVisible}
            onClose={toggleCreateAListing}
            onCreateListing={handleCreateListing}
            categories={['Car', 'Bills', 'Groceries']}
            item={item}
          />
           <RoomSettingsModal
            isVisible={isRoomSettingsModalVisible}
            onClose={toggleRoomSettings}
            onLeave={handleUserLeave}
            onbudgetChange={handleBudgetChange}
            currentBudget={item.allBudget}
          />
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
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    listContainerContent: {
      justifyContent: 'center',
      alignItems: 'center',
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
    centeredButtonContainer:{
      height: '5%',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
      bottom: 25,
    }
  });
  
  