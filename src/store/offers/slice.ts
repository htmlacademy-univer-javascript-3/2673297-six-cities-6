import { createSlice } from '@reduxjs/toolkit';
import { Offers } from '../../types/offer';
import { SortType } from '../../types/sort-type';
import {NameSpace} from '../../const.ts';

export interface OffersState {
  offers: Offers;
  cities: string[];
  selectedCity: string;
  sortType: SortType;
  isOffersLoading: boolean;
}

const initialState: OffersState = {
  offers: [],
  cities: ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'],
  selectedCity: 'Paris',
  sortType: SortType.Popular,
  isOffersLoading: false,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    selectCity: (state, action: { payload: string }) => {
      state.selectedCity = action.payload;
    },
    selectSorting: (state, action: { payload: SortType }) => {
      state.sortType = action.payload;
    },
    setOffers: (state, action: { payload: Offers }) => {
      state.offers = action.payload;
    },
    setOffersLoadingStatus: (state, action: { payload: boolean }) => {
      state.isOffersLoading = action.payload;
    },
  },
});

export const { selectCity, selectSorting, setOffers, setOffersLoadingStatus } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
