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
    

      if (payload.admin !== undefined) {
        state.admin = payload.admin.adminStatus;
      } else {
        state.admin = payload.data?.adminStatus;
        
      }

      state.user = payload;
    },
  },
});

export const { puJWT, setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
