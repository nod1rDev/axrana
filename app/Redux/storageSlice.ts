import { createSlice } from "@reduxjs/toolkit";

const storageSlice = createSlice({
  name: "storageSlice",
  initialState: {
    shahar: { open: false, id: 0, name: "" },
    boshliq: { open: false, id: 0, name: "" },
    manzil: { open: false, id: 0, name: "" },
    bank: { open: false, id: 0, name: "" },
  },
  reducers: {
    setModalShahar: (state, { payload }) => {
      state.shahar = payload;
    },
    setModalboshliq: (state, { payload }) => {
      state.boshliq = payload;
    },
    setModalManzil: (state, { payload }) => {
      state.manzil = payload;
    },
    setModalBank: (state, { payload }) => {
      state.bank = payload;
    },
  },
});
export const { setModalShahar, setModalboshliq, setModalManzil, setModalBank } =
  storageSlice.actions;
export default storageSlice.reducer;
