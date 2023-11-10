import firestore from '@react-native-firebase/firestore';
import { generateDateCode } from '../utils/functions/dateCodeGenerator';
import auth from '@react-native-firebase/auth';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { generateInviteId } from '../utils/functions/invite-id-generator';
import { showError } from '../utils/functions/show-error';

export type RoomData = {
    id: string
    name: string;
    categoryId: string;
    allBudget: number;
    color: string;
    userIds: [string]
    amount: number
    qr?: string
    linstingDateCode: string
    inviteId: string;
  };
export type UserData = {
  name: string;
  password: string;
  nock: string;
  // Add other properties here
};
export type CategoryData = {
    name: string;
    id: string;
    budget: number;
    color: string;
    amount: number;
    // Add other properties here
  };
  
  // Define a type for listingData
  export type ListingData = {
    roomid: string;
    id: string;
    category: string;
    user: string;
    amount: number;
    date: string;
    dateCode: string;
    // Add other properties here
  };


// Function to read all users from Firestore
async function getUsers() {
  try {
    const usersSnapshot = await firestore()
      .collection('Users')
      .get();
    const users = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    showError('Error reading users')
    return [];
  }
}

// Function to read all rooms from Firestore
async function getRooms() {
  try {
    const roomsSnapshot = await firestore()
      .collection('Rooms')
      .get();
    const rooms = roomsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return rooms;
  } catch (error) {
    showError('Error reading rooms')
    return [];
  }
}

// Function to read all categories from Firestore
async function getCategories() {
  try {
    const categoriesSnapshot = await firestore()
      .collection('Categories')
      .get();
    const categories = categoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return categories;
  } catch (error) {
    showError('Error reading categories')
    return [];
  }
}

// Function to read all listings from Firestore
async function getListings() {
  try {
    const listingsSnapshot = await firestore()
      .collection('Listings')
      .get();
    const listings = listingsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return listings;
  } catch (error) {
    showError('Error reading listings')
    return [];
  }

}

export async function getRoomsByUserId(userId: string): Promise<RoomData[]> {
  const roomsCollection = firestore().collection('Rooms');
  const querySnapshot = await roomsCollection.where('userIds','array-contains', userId).get()
  
  const roomsData: RoomData[] = [];

  querySnapshot.forEach((documentSnapshot) => {
    const data = documentSnapshot.data() as RoomData;
    roomsData.push(data);
  });

  return roomsData;
}
async function getListingsByRoomId(roomid: string)
{
  try {
    const roomsSnapshot = await firestore()
      .collection('Listings')
      .where('roomid','==', roomid)
      .get();
    const rooms = roomsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return rooms;
  } catch (error) {
    showError('Error reading listings for room ID')
    return [];
  }
}

async function joinRoom(inviteId: string, userId: string) {
  try {
    // Find the room by inviteId
    const roomQuerySnapshot = await firestore()
      .collection('Rooms')
      .where('inviteId', '==', inviteId)
      .get();

    // Check if the room exists
    if (roomQuerySnapshot.size === 0) {
      showError('Room not found with the provided inviteId')
      throw new Error('Room not found with the provided inviteId');
    }

    // Extract room data
    const roomDoc = roomQuerySnapshot.docs[0];
    const roomData = roomDoc.data() as RoomData;

    // Check if the userId is already in the userids array
    if (roomData.userIds.includes(userId)) {
      showError('User is already a member of the room')
      throw new Error('User is already a member of the room');
    }

    // Update the room document by adding the userId to the userids array
    const updatedUserIds = [...roomData.userIds, userId];

    await roomDoc.ref.update({
      userIds: updatedUserIds,
    });

    console.log('User successfully added to the room');
  } catch (error) {
    showError(`${error}`)
  }
}





async function addUser(userData: UserData) {
    const userRef = firestore().collection('Users').doc();
    await userRef.set(userData);
    return userRef.id;
  }
  
  // Function to add a new room to Firestore
 async function addRoom(roomData: RoomData) {
    const roomRef = firestore().collection('Rooms').doc();
    await roomRef.set(roomData);
    return roomRef.id;
  }
  // Function to add a new category to Firestore
async function addCategory(categoryData : CategoryData) {
    const categoryRef = firestore().collection('Categories').doc();
    await categoryRef.set(categoryData);
    return categoryRef.id;
  }
  
  // Function to add a new listing to Firestore                             
 async function addListing(listingData : ListingData) {
    const listingRef = firestore().collection('Listings').doc();
    await listingRef.set(listingData);
    return listingRef.id;
  }
  async function createRoomFromName(name: string, userId: string){
    try {
      const roomData: RoomData = {
        id: uuidv4(),
        name: name,
        categoryId: 'your_category_id',
        allBudget: 0,
        color: 'orange',
        userIds: [userId],
        amount: 0,
        linstingDateCode: generateDateCode(),
        inviteId: generateInviteId()
      };
  
      const roomId = await firestoreFunctions.addRoom(roomData);
  
      return roomId;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  };
 function getCurrentUserId (){
    const user = auth().currentUser;
    if (user) {
      return user.uid;
    }
    console.log ('no user signed in')
    return "null, error";
  };

// // Example usage
// (async () => {
//   try {
//     const users = await getUsers();
//     console.log('Users:', users);

//     const rooms = await getRooms();
//     console.log('Rooms:', rooms);

//     const categories = await getCategories();
//     console.log('Categories:', categories);

//     const listings = await getListings();
//     console.log('Listings:', listings);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// })();

export const firestoreFunctions = {
    getUsers,
    getRooms,
    getCategories,
    getListings,
    addUser,
    addRoom,
    addCategory,
    addListing,
    getListingsByRoomId,
    getRoomsByUserId,
    createRoomFromName,
    getCurrentUserId,
    joinRoom
  };

