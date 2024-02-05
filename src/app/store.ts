import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { coreApi } from '../api/coreApi';
import authReducer from '../features/authSlice';
import breadcrumbReducer from './../features/breadcrumbSlice';
import sidebarReducer from './../features/sidebarSlice';
import toastReducer from './../features/toastSlice';
import themeReducer from '../features/themeSlice';

export const store = configureStore({
  reducer: {
    [coreApi.reducerPath]: coreApi.reducer,
    auth: authReducer,
    breadcrumb: breadcrumbReducer,
    sidebar: sidebarReducer,
    toast: toastReducer,
    themes: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coreApi.middleware),
  devTools: import.meta.env.VITE_MODE !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
