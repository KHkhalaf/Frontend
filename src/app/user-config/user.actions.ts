import { Action, createAction, props } from '@ngrx/store';
import { response } from './modules/response';

export const loadUsers = createAction(
  '[Users] Load Users',
  props<{ pageNumberOrID: number; searchAction: boolean }>()
);
export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ response: response }>()
);
export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any }>()
);
