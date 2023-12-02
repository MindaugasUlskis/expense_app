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
export type OldRoomData = {
  id: string
  allBudget: number;
  amount: number
  linstingDateCode: string
};
export type User = {
  username: string;
  userID: string;
};
export type CategoryData = {
  name: string;
  id: string;
  budget: number;
  color: string;
  amount: number;
};

export type ListingData = {
  roomid: string;
  id: string;
  category: string;
  user: string;
  amount: number;
  date: string;
  dateCode: string;
  userNickName: string;
};
const checkDocumentAndUsername = async (userID: string): Promise<boolean> => {
  try {
    const collectionRef = firestore().collection('User');

    const querySnapshot = await collectionRef
      .where('userID', '==', userID)
      .where('username', '!=', '')
      .get();

    if (querySnapshot.docs.length === 0) {
      return false;
    }
  } catch (error) {
    throw error;
  }

  return true;
};

const deleteDocumentByIdAttribute = async (docId: string, collection: string) => {
  try {
    const collectionRef = firestore().collection(collection);

    const querySnapshot = await collectionRef.where('id', '==', docId).get();
    if (querySnapshot.docs.length === 0) {
      console.warn(`Document with ID ${docId} not found`);
      return;
    }
    const docRef = querySnapshot.docs[0].ref;
    await docRef.delete();

  } catch (error) {
    console.error('Error deleting document:', error);
  }
};
const updateDocumentBudgetByIdAttribute = async (docId: string, newBudget: number, collection: string) => {
  try {
    const collectionRef = firestore().collection(collection);
    const querySnapshot = await collectionRef.where('id', '==', docId).get();

    if (querySnapshot.docs.length === 0) {
      console.warn(`Document with ID ${docId} not found`);
      return;
    }
    const docRef = querySnapshot.docs[0].ref;
    await docRef.update({
      budget: newBudget,
    });

    console.log(`Budget for document with ID ${docId} updated successfully`);
  } catch (error) {
    console.error('Error updating document:', error);
  }
};
const updateUserArrayInRoom = async (roomId: string, userIdToRemove: string) => {
  try {
    const collectionRef = firestore().collection("Rooms");
    const querySnapshot = await collectionRef.where('id', '==', roomId).get();

    if (querySnapshot.docs.length === 0) {
      console.warn(`Room with ID ${roomId} not found`);
      return;
    }

    const roomDoc = querySnapshot.docs[0];
    const currentUsers = roomDoc.data()?.userIds || [];

    const updatedUsers = currentUsers.filter((userId: string) => userId !== userIdToRemove);

    await roomDoc.ref.update({
      userIds: updatedUsers,
    });


  } catch (error) {
    console.error('Error updating users array in room:', error);
  }
};
const updateNickname = async (nick: string, userId: string) => {
  try {
    const collectionRef = firestore().collection("Nicknames");
    const querySnapshot = await collectionRef.where('userID', '==', userId).get();

    if (querySnapshot.docs.length === 0) {
      console.warn(`User with ID ${userId} not found`);
      return;
    }
    const userDoc = querySnapshot.docs[0];

    await userDoc.ref.update({
      nickname: nick,
    });

  } catch (error) {
    console.error('Error updating user nickname', error);
  }
};

async function addNick(user: User) {
  const roomRef = firestore().collection('Nicknames').doc();
  await roomRef.set(user);
  return roomRef.id;
}

async function createNickname(nick: string, userId: string) {
  try {
    const userData: User = {
      username: nick,
      userID: userId
    };
    const user = await firestoreFunctions.addNick(userData);
    return user;
  } catch (error) {
    console.error('Error creating nickname:', error);
    throw error;
  }
};

const getNicknameByUserIDSync = async (userId: string): Promise<string> => {
  try {
    const collectionRef = firestore().collection("Nicknames");
    const querySnapshot = await collectionRef.where('userID', '==', userId).get();

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc ? userDoc.data().username : '';

    return userData;
  } catch (error) {
    console.error('Error getting user nickname', error);
    return '';
  }
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
  const querySnapshot = await roomsCollection.where('userIds', 'array-contains', userId).get()

  const roomsData: RoomData[] = [];

  querySnapshot.forEach((documentSnapshot) => {
    const data = documentSnapshot.data() as RoomData;
    roomsData.push(data);
  });

  return roomsData;
}
async function getListingsByRoomId(roomid: string) {
  try {
    const roomsSnapshot = await firestore()
      .collection('Listings')
      .where('roomid', '==', roomid)
      .get();
    const rooms = roomsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return rooms;
  } catch (error) {
    showError('Error reading listings for room ID')
    return [];
  }
}
async function getListingsByRoomIdAndDateCode(roomid: string, datecode: string): Promise<ListingData[]> {
  try {
    const listingsSnapshot = await firestore()
      .collection('Listings')
      .where('roomid', '==', roomid)
      .where('dateCode', '==',datecode)
      .get();
    const listings = listingsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ListingData[];
    listings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return listings;
  } catch (error) {
    showError('Error reading listings for room ID and date code');
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

  } catch (error) {
    showError(`${error}`)
  }
}




// Function to add a new room to Firestore
async function addRoom(roomData: RoomData) {
  const roomRef = firestore().collection('Rooms').doc();
  await roomRef.set(roomData);
  return roomRef.id;
}
async function addOldRoom(roomData: OldRoomData) {
  const roomRef = firestore().collection('OldRooms').doc();
  await roomRef.set(roomData);
  return roomRef.id;
}
// Function to add a new category to Firestore
async function addCategory(categoryData: CategoryData) {
  const categoryRef = firestore().collection('Categories').doc();
  await categoryRef.set(categoryData);
  return categoryRef.id;
}

// Function to add a new listing to Firestore                             
async function addListing(listingData: ListingData) {
  const listingRef = firestore().collection('Listings').doc();
  await listingRef.set(listingData);
  return listingRef.id;
}
async function createRoomFromName(name: string, userId: string) {
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
async function createOldRoomFromRoomData(room: RoomData) {
  try {
    const oldRoomData: OldRoomData = {
      id: room.id,
      allBudget: room.allBudget,
      amount: room.amount,
      linstingDateCode: room.linstingDateCode,
    };
    const roomId = await firestoreFunctions.addOldRoom(oldRoomData);
    return roomId;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};
function getCurrentUserId() {
  const user = auth().currentUser;
  if (user) {
    return user.uid;
  }
  return "null, error";
};

async function updateRoomData(item: RoomData) {
  try {
    const updatedRoomData = {
      id: item.id,
      name: item.name,
      categoryId: item.categoryId,
      allBudget: 0,
      color: item.color,
      userIds: item.userIds,
      amount: 0,
      qr: item.qr || '',
      linstingDateCode: generateDateCode(),
      inviteId: item.inviteId,
    };

    const roomQuerySnapshot = await firestore()
      .collection('Rooms')
      .where('id', '==', item.id)
      .get();

    if (roomQuerySnapshot.docs.length > 0) {
      const roomDoc = roomQuerySnapshot.docs[0];
      await roomDoc.ref.update(updatedRoomData);

    } else {
      console.log('No room found for the given ID');
    }
  } catch (error) {
    showError(`Error updating room data: ${error}`);
  }
}
async function getListingDateCodeByRoomId(roomId: string): Promise<string> {
  try {
    const roomQuerySnapshot = await firestore()
      .collection('Rooms')
      .where('id', '==', roomId)
      .get();


    const roomData = roomQuerySnapshot.docs[0].data() as RoomData;
    const listingDateCode = roomData.linstingDateCode;

    if (listingDateCode === null) {
      showError('Listing Date Code is null');
      return 'error if it\'s null';
    }

    return listingDateCode;
  } catch (error) {
    showError(`Error fetching listingDateCode for room ID: ${error}`);
    return 'error if it\'s null';
  }
}
async function getRoomByRoomId(roomId: string): Promise<RoomData>{
  const roomQuerySnapshot = await firestore()
  .collection('Rooms')
  .where('id', '==', roomId)
  .get();

  const roomData = roomQuerySnapshot.docs[0].data() as RoomData;

  return roomData
}

async function createListing(amount: number, userId: string, category: string, roomId: string): Promise<string> {
  try {

  const nick = await getNicknameByUserIDSync(userId)

    const listingData: ListingData = {
      roomid: roomId,
      id: uuidv4(),
      category: category,
      user: userId,
      amount: amount,
      date: new Date().toISOString(),
      dateCode: generateDateCode(),
      userNickName: nick
    };
    const listingId = await firestoreFunctions.addListing(listingData);
    return listingId;
  } catch (error) {
    showError(`Error creating a listing: ${error}`);
    return 'error in creation of listing'
  }
}
async function getOldRoomsByRoomId(roomId: string): Promise<OldRoomData[]> {
  try {
    const oldRoomsSnapshot = await firestore()
      .collection('OldRooms')
      .where('id', '==', roomId)
      .get();

    const oldRoomsData: OldRoomData[] = [];

    oldRoomsSnapshot.forEach((documentSnapshot) => {
      const data = documentSnapshot.data() as OldRoomData;
      oldRoomsData.push(data);
    });
    oldRoomsData.sort((a, b) => parseInt(a.linstingDateCode) - parseInt(b.linstingDateCode));
    return oldRoomsData;
  } catch (error) {
    showError(`Error reading old rooms for room ID: ${error}`);
    return [];
  }
}

const loadAllRooms = async (item : RoomData) => {
  try {
    const oldRooms: OldRoomData[] = await firestoreFunctions.getOldRoomsByRoomId(item.id);
    const currentRoom: OldRoomData = {
      id: item.id,
      allBudget: item.allBudget,
      amount: item.amount,
      linstingDateCode: item.linstingDateCode
    }
    const mergedArray: OldRoomData[] = [...oldRooms, currentRoom];
    mergedArray.sort((a, b) => parseInt(b.linstingDateCode) - parseInt(a.linstingDateCode));
    return mergedArray;
  } catch (error) {
    console.error('Error fetching old rooms:', error);
    return []; 
  }
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
  addRoom,
  addCategory,
  addListing,
  getListingsByRoomId,
  getRoomsByUserId,
  createRoomFromName,
  getCurrentUserId,
  joinRoom,
  addOldRoom,
  createOldRoomFromRoomData,
  updateRoomData,
  getListingDateCodeByRoomId,
  getRoomByRoomId,
  getListingsByRoomIdAndDateCode,
  createListing,
  deleteDocumentByIdAttribute,
  updateDocumentBudgetByIdAttribute,
  updateUserArrayInRoom,
  getOldRoomsByRoomId,
  loadAllRooms,
  checkDocumentAndUsername,
  createNickname,
  addNick,
  updateNickname,
  getNicknameByUserIDSync

};

