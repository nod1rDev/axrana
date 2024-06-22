import { createSlice } from "@reduxjs/toolkit";

const LovozimSlice = createSlice({
  name: "Lavozim",
  initialState: {
    modal: {
      type: 0,
      open: false,
      id: 0,
      name: "",
      koefsent: "",
    },
  },
  reducers: {
    setModalLavozim: (state, { payload }) => {
      state.modal = payload;
    },
  },
});

export const { setModalLavozim } = LovozimSlice.actions;

export default LovozimSlice.reducer;
