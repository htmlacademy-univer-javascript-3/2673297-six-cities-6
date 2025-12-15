import { createSlice } from '@reduxjs/toolkit';
import { OfferDetails } from '../../types/offer-details';
import {NameSpace} from '../../const.ts';

export interface SelectedOfferState {
  selectedOffer?: OfferDetails;
  isSelectedOfferLoading: boolean;
}

const initialState: SelectedOfferState = {
  selectedOffer: undefined,
  isSelectedOfferLoading: false,
};

export const selectedOfferSlice = createSlice({
  name: NameSpace.SelectedOffer,
  initialState,
  reducers: {
    setSelectedOffer: (state, action: { payload: OfferDetails | undefined }) => {
      state.selectedOffer = action.payload;
    },
    setSelectedOfferLoadingStatus: (state, action: { payload: boolean }) => {
      state.isSelectedOfferLoading = action.payload;
    }
  },
});

export const { setSelectedOffer, setSelectedOfferLoadingStatus } = selectedOfferSlice.actions;
export const selectedOfferReducer = selectedOfferSlice.reducer;
