import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import wikimediaReducer from './slices/wikimediaSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wikimedia: wikimediaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;