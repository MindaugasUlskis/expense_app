import { firestoreFunctions, RoomData, CategoryData, ListingData } from "./database-requests";



export const  inputMockData = () => {
    (async () => {
        try {
          // Example data for a new user
          const newUser = {
            name: 'NIGA BALLS',
            password: 'password123',
            nock: 'example',
            invites: [],
            rooms: [],
          };
      
          const userId = await firestoreFunctions.addUser(newUser);
          console.log('New User ID:', userId);
      
          // Example data for a new room
          const newRoom: RoomData = {
            name: 'Living Room',
            categoryId: 'your-category-id',
            allBudget: 1000,
            color: 'blue',
            userIds: ['testtest'],
            amount: 0,
            listingMonth: 5,
          };
      
          const roomId = await firestoreFunctions.addRoom(newRoom);
          console.log('New Room ID:', roomId);
      
          // Example data for a new category
          const newCategory: CategoryData = {
            id: 'your-unique-id',
            name: 'Electronics',
            budget: 500,
            color: 'green',
            amount: 0,
          };
      
          const categoryId = await firestoreFunctions.addCategory(newCategory);
          console.log('New Category ID:', categoryId);
      
          // Example data for a new listing
          const newListing : ListingData = {
            id: 'dadadaa',
            category: 'your-category-id',
            user: 'your-user-id',
            amount: 50,
            date: '2023-10-25',
          };
      
          const listingId = await firestoreFunctions.addListing(newListing);
          console.log('New Listing ID:', listingId);
        } catch (error) {
          console.error('Error:', error);
        }
      })();
      console.log(firestoreFunctions.getRooms())
}