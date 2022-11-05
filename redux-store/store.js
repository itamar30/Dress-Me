import { configureStore } from "@reduxjs/toolkit";
import shirtReducer from "../features/shirt/shirtSlice";
import shirtDetailsReducer from "../features/shirt/shirtDetails/shirtDetailsSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  shirt: shirtReducer,
  shirtDetails: shirtDetailsReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["shirt", "shirtDetails"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
