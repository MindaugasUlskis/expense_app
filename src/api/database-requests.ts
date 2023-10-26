import firestore from '@react-native-firebase/firestore';

export type RoomData = {
    name: string;
    categoryId: string;
    allBudget: number;
    color: string;
    userIds: [string]
    amount: number
    qr?: string
    listingMonth: number
    // Define other properties here
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
    console.error('Error reading users:', error);
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
    console.error('Error reading rooms:', error);
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
    console.error('Error reading categories:', error);
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
    console.error('Error reading listings:', error);
    return [];
  }
}

async function getRoomsByUserId(userId: string[]) {
  try {
    const roomsSnapshot = await firestore()
      .collection('Rooms')
      .where('userIds','array-contains-any', userId)
      .get();
    const rooms = roomsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return rooms;
  } catch (error) {
    console.error('Error reading rooms for user IDs:', error);
    return [];
  }
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
    console.error('Error reading listings for room ID:', error);
    return [];
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
    getRoomsByUserId
  };
