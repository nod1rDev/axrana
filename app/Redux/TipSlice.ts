import { createSlice } from "@reduxjs/toolkit";

const TipSlice = createSlice({
  name: "TIP",
  initialState: {
    modal: { type: 0, open: false, id: 0, name: "" },
  },
  reducers: {
    setModalTip: (state, { payload }) => {
      state.modal = payload;
    },
  },
});

export const { setModalTip } = TipSlice.actions;

export default TipSlice.reducer;
