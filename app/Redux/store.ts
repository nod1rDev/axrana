import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import Folder from "./Folder";
import ShaxsiySlice from "./ShaxsiySlice";
import UnvonSlice from "./UnvonSlice";
import locationSlice from "./locationSlice";
import CoctavsSlice from "./CoctavsSlice";
import LavozimSlice from "./LavozimSlice";
import TipSlice from "./TipSlice";
import FileSlice from "./FileSlice";

export const store = () => {
  return configureStore({
    reducer: {
      auth: AuthSlice,
      folder: Folder,
      shax: ShaxsiySlice,
      unvon: UnvonSlice,
      locat: locationSlice,
      coctav: CoctavsSlice,
      lavozim: LavozimSlice,
      tip: TipSlice,
      file: FileSlice,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
