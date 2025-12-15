import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../types/auth-status';
import { User } from '../../types/user';
import {NameSpace} from '../../const.ts';

export interface UserState {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: { payload: AuthorizationStatus }) => {
      state.authorizationStatus = action.payload;
    },
    setUserData: (state, action: { payload: User | null }) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthorizationStatus, setUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
