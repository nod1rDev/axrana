import { createSlice } from "@reduxjs/toolkit";


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
      state.admin = payload.data?.adminstatus;

      state.user = payload;
    },
    changeAdminStatuss: (state, { payload }) => {
      state.admin = payload;
    },
  },
});

export const { puJWT, setUser, changeAdminStatuss } = AuthSlice.actions;

export default AuthSlice.reducer;
