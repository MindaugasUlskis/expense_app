import { RoomData } from "../api/database-requests";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Room: RoomScreenParams;
  };

  type RoomScreenParams = {
    item: RoomData;
  };