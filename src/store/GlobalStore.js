import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./slice/TodoSlice";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session"; 
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  todo: todoReducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["todo"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

// normal configuration
// const store = configureStore({
//   reducer: {
//     todo: todoReducer,
//   },
// });

export default store;
