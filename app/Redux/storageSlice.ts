import { createSlice } from "@reduxjs/toolkit";

const storageSlice = createSlice({
  name: "storageSlice",
  initialState: {
    shahar: { open: false, id: 0, name: "" },
    boshliq: { open: false, id: 0, name: "" },
  },
  reducers: {
    setModalShahar: (state, { payload }) => {
      state.shahar = payload;
    },
    setModalboshliq: (state, { payload }) => {
      state.boshliq = payload;
    },
  },
});
export const { setModalShahar, setModalboshliq } = storageSlice.actions;
export default storageSlice.reducer;
