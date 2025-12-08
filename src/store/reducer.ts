import { createReducer } from '@reduxjs/toolkit';
import {selectCity, selectSorting, setAuthorizationStatus, setOffers, setOffersLoadingStatus, setSelectedOffer, setSelectedOfferLoadingStatus, setUserData} from './action';
import {Offers} from '../types/offer.ts';
import {SortType} from '../types/sort-type.ts';
import {OfferDetails} from '../types/offer-details.ts';
import {AuthorizationStatus} from '../types/auth-status.ts';
import {User} from '../types/user.ts';


export type AppState = {
  offers: Offers;
  cities: string[];
  selectedCity: string;
  sortType: SortType;
  selectedOffer?: OfferDetails;
  isOffersLoading: boolean;
  isSelectedOfferLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
}

const initialState: AppState = {
  offers: [],
  cities: [
    'Paris',
    'Cologne',
    'Brussels',
    'Amsterdam',
    'Hamburg',
    'Dusseldorf'
  ],
  selectedCity: 'Paris',
  sortType: SortType.Popular,
  selectedOffer: undefined,
  isOffersLoading: false,
  isSelectedOfferLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const reducer = createReducer<AppState>(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(selectSorting, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(setSelectedOfferLoadingStatus, (state, action) => {
      state.isSelectedOfferLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.user = action.payload;
    });
});

