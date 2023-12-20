import { ActionReducerMap } from '@ngrx/store';
import { UserReducer } from './user-config/user.reducer';
import { response } from './user-config/modules/response';
import { loadingReducer } from './loading-config/loading.reducer';
import { LoadingState } from './loading-config/modules/loading.state';

export const appReducers: ActionReducerMap<AppState> = {
  response: UserReducer,
  loading: loadingReducer,
};

export interface AppState {
  response: response;
  loading: LoadingState;
}
