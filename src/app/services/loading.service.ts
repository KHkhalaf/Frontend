import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { startLoading, stopLoading } from '../loading-config/loading.actions';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private store: Store<AppState>) {}

  startLoading() {
    this.store.dispatch(startLoading());
  }

  stopLoading() {
    this.store.dispatch(stopLoading());
  }
}
