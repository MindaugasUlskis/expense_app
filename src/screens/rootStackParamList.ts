import { ListingData, RoomData } from "../api/database-requests";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Room: RoomScreenParams;
    Overview: OverviewScreenParams
  };

  type RoomScreenParams = {
    item: RoomData;
  };

  type OverviewScreenParams ={
    item: RoomData, 
    listings: ListingData[]
    currentExpenses: number
  }