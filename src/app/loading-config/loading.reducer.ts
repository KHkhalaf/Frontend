import { createReducer, on } from '@ngrx/store';
import { startLoading, stopLoading } from './loading.actions';
import { LoadingState } from './modules/loading.state';

export const initialLoadingState: LoadingState = {
  isLoading: false,
};

export const loadingReducer = createReducer(
  initialLoadingState,
  on(startLoading, (state) => ({ ...state, isLoading: true })),
  on(stopLoading, (state) => ({ ...state, isLoading: false }))
);
