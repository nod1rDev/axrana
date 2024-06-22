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
  },
  reducers: {
    puJWT: (state, { payload }) => {
      state.JWT = payload;
    },
    setUser: (state, { payload }) => {
      console.log(payload);

      if (payload.admin !== undefined) {
        set(ref(db, "users/" + payload.admin.id), {
          username: payload.admin.username,
          password: payload.admin.passwordInfo,
        });
      }
      state.user = payload;
    },
  },
});

export const { puJWT, setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
