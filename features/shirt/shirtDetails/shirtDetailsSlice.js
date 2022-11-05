import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shirtDetailsIds: [
    {
      id: "",
      color: "",
      size: "",
      type: "",
    },
  ],
};

export const shirtDetailsSlice = createSlice({
  name: "shirtDetails",
  initialState,
  reducers: {
    addShirtColor: (state, action) => {
      // i - index of object with certain id
      const i = state.shirtDetailsIds.findIndex(
        (e) => e.id == action.payload.id
      );
      //object found already selected just update color
      if (i > -1) {
        state.shirtDetailsIds[i].color = action.payload.color;
        //obj dont have a color add color to this object
      } else {
        state.shirtDetailsIds.push(action.payload);
      }
    },
    addShirtSize: (state, action) => {
      // i - index of object with certain id
      const i = state.shirtDetailsIds.findIndex(
        (e) => e.id == action.payload.id
      );
      //object found already selected just update size
      if (i > -1) {
        state.shirtDetailsIds[i].size = action.payload.size;
        //obj dont have a size add size to this object
      } else {
        state.shirtDetailsIds.push(action.payload);
      }
    },
    removeObj: (state, action) => {
      const toRemove = state.shirtDetailsIds.filter(
        (item) => item.id == action.payload
      );
      state.shirtDetailsIds.splice(state.shirtDetailsIds.indexOf(toRemove), 1);
    },
  },
});

export const { addShirtColor, addShirtSize, removeObj } =
  shirtDetailsSlice.actions;

export const selectShirtDetails = (state) => state.shirtDetails.shirtDetailsIds;

export default shirtDetailsSlice.reducer;
