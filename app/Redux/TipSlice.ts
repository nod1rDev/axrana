import { createSlice } from "@reduxjs/toolkit";

const TipSlice = createSlice({
  name: "TIP",
  initialState: {
    modal: {
      type: 0,
      open: false,
      id: 0,
      name: "",
      FIO: "Bekzod Abdullayev Ibrohimovich",
    },
    modal2: { open: false, shartnomaId: 0, organId: 0, sana: "" },
  },
  reducers: {
    setModalTip: (state, { payload }) => {
      state.modal = payload;
    },
    setModalBitta: (state, { payload }) => {
      state.modal2 = payload;
    },
  },
});

export const { setModalTip, setModalBitta } = TipSlice.actions;

export default TipSlice.reducer;
