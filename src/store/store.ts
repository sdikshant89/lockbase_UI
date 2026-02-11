import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session';
import authReducer from './slices/authSlice';
import signUpReducer from './slices/signUpSlice';
import vaultReducer from './slices/vaultSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  signUp: signUpReducer,
  vault: vaultReducer,
});

const persistConfig = {
  key: 'lockbase',
  storage: storageSession,
  whitelist: ['signUp', 'auth', 'vault'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          'persist/STORAGE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/FLUSH',
        ],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
