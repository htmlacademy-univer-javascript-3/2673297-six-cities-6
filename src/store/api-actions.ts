import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import { AppState } from './reducer';
import { AxiosInstance } from 'axios';
import { setOffers, setOffersLoadingStatus, setSelectedOffer, setSelectedOfferLoadingStatus } from './action';
import {APIRoute} from './api-route.ts';
import {Offer, Offers} from '../types/offer.ts';
import {Reviews} from '../types/review.ts';
import {OfferDetails} from '../types/offer-details.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    dispatch(setSelectedOffer(undefined));

    const { data } = await api.get<Offers>(APIRoute.Offers);

    dispatch(setOffersLoadingStatus(false));
    dispatch(setOffers(data));
  },
);

export const fetchOfferDetailsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOfferDetails',
  async (offerId: string, { dispatch, extra: api }) => {
    dispatch(setSelectedOfferLoadingStatus(true));

    const offerData = await api.get<Offer>(APIRoute.OfferDetails.replace(':id', offerId));
    const reviewsData = await api.get<Reviews>(APIRoute.OfferReviews.replace(':id', offerId));
    const offersNearbyData = await api.get<Offers>(APIRoute.OffersNearby.replace(':id', offerId));

    const offerDetails: OfferDetails = {
      offer: offerData.data,
      reviews: reviewsData.data,
      offersNearby: offersNearbyData.data,
    };

    dispatch(setSelectedOfferLoadingStatus(false));
    dispatch(setSelectedOffer(offerDetails));
  },
);
