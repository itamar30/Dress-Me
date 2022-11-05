import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: [],
};

export const shirtSlice = createSlice({
  name: "shirt",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.ids.push(action.payload);
    },
    removeItem: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload), 1);
    },
  },
});

export const { addItem, removeItem } = shirtSlice.actions;

export const selectShirt = (state) => state.shirt.ids;

export default shirtSlice.reducer;
