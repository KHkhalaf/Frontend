import { createReducer, on } from '@ngrx/store';
import { response } from './modules/response';
import * as UserActions from './user.actions';

export const initialState: response = {} as response;

export const UserReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { response }) => response)
);
