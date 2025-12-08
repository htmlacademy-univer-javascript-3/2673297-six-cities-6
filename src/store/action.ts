import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/offer.ts';
import {SortType} from '../types/sort-type.ts';
import {OfferDetails} from '../types/offer-details.ts';
import {AuthorizationStatus} from '../types/auth-status.ts';
import {User} from '../types/user.ts';
import {Reviews} from '../types/review.ts';

export const selectCity = createAction<string>('selectCity');
export const setOffers = createAction<Offers>('setOffers');
export const selectSorting = createAction<SortType>('selectSorting');
export const setOffersLoadingStatus = createAction<boolean>('setOffersLoadingStatus');
export const setSelectedOffer = createAction<OfferDetails | undefined>('setSelectedOffer');
export const setSelectedOfferLoadingStatus = createAction<boolean>('setSelectedOfferLoadingStatus');
export const setAuthorizationStatus = createAction<AuthorizationStatus>('setAuthorizationStatus');
export const setUserData = createAction<User|null>('setUserData');
export const setReviews = createAction<Reviews>('setReviews');
