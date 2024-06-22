import { createSlice } from "@reduxjs/toolkit";

const ShaxsiySlice = createSlice({
  name: "Shaxsiy",
  initialState: {
    modal: false,
    alert: {
      open: false,
      message: "",
      status: "error",
    },
  },
  reducers: {
    setModalShaxsiy: (state, { payload }) => {
      state.modal = payload;
    },
    alertChange: (state, { payload }) => {
      state.alert = payload;
    },
    alertClose: (state, { payload }) => {
      state.alert.open = payload;
    },
  },
});

export const { setModalShaxsiy, alertChange, alertClose } =
  ShaxsiySlice.actions;

export default ShaxsiySlice.reducer;
