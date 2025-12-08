import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import {checkAuthAction, fetchOffersAction} from './api-actions';
import {createAPI} from '../api/api.ts';

export const api = createAPI();

export const appStateStore = configureStore(
  {
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  },
);

appStateStore.dispatch(checkAuthAction());
appStateStore.dispatch(fetchOffersAction());

export type AppDispatch = typeof appStateStore.dispatch;
