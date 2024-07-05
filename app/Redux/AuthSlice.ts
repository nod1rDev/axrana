import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "../Api/Apis";
import { ref, set } from "firebase/database";
import { db } from "../firebase";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    JWT:
      typeof sessionStorage !== "undefined"
        ? sessionStorage.getItem("token")
        : "out",
    user: null,
    id: 0,
    admin: false,
  },
  reducers: {
    puJWT: (state, { payload }) => {
      state.JWT = payload;
    },
    setUser: (state, { payload }) => {
      state.admin = payload.data?.adminStatus;

      state.user = payload;
    },
    changeAdminStatus: (state, { payload }) => {
      state.admin = payload;
    },
  },
});

export const { puJWT, setUser, changeAdminStatus } = AuthSlice.actions;

export default AuthSlice.reducer;
