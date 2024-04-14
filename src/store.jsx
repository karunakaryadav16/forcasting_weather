import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: []
}

export const counterSlice = createSlice({
  name: 'karunakar',
  initialState,
  reducers: {
    addtostore: (state, action) => {
      state.value.push(action.payload)
    },
    removefromstore: (state, action) => {
      state.value.pop()
    }
  },
});

export const { addtostore, removefromstore } = counterSlice.actions;
const persistedReducer = persistReducer({
  key: 'root',
  storage,
}, counterSlice.reducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);






