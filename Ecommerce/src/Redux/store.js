
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './AddCartSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './userSlice.js';

import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  cart: cartReducer, 
   user: userReducer,  
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);


