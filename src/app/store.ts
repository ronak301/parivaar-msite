import { configureStore } from "@reduxjs/toolkit";
import communityReducer from "src/modules/directory/redux/communitySlice";
import { applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

import logger from "redux-logger";
import authReducer from "../modules/authentication/redux/authSlice";
import searchReducer from "src/modules/directory/screens/SearchScreen/redux/searchSlice";
import profileReducer from "src/modules/profile/redux/profileSlice";
import storage from "redux-persist/lib/storage";

/**
 *
 */

const persistConfig = {
  key: "root",
  whitelist: ["auth", "community", "today"],
  storage,
};

const rootReducer = combineReducers({
  community: communityReducer,
  auth: authReducer,
  search: searchReducer,
  profile: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
