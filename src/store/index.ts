import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './offers/slice';
import { selectedOfferReducer } from './selected-offer/slice';
import { userReducer } from './user/slice';

import { checkAuthAction, fetchOffersAction } from './api-actions';
import { createAPI } from '../api/api';

export const api = createAPI();

export const appStateStore = configureStore({
  reducer: {
    offers: offersReducer,
    selectedOffer: selectedOfferReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

appStateStore.dispatch(checkAuthAction());
appStateStore.dispatch(fetchOffersAction());

export type RootState = ReturnType<typeof appStateStore.getState>;
export type AppDispatch = typeof appStateStore.dispatch;
