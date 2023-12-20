import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, interval, timer } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { response } from 'src/app/user-config/modules/response';
import { loadUsers } from 'src/app/user-config/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchUserId: number;
  hideSearchField: boolean = true;
  response$: Observable<response>;
  private subscription: Subscription;

  constructor(private router: Router, private store: Store<AppState>) {}

  navigate2Users() {
    this.hideSearchField = false;
    this.store.dispatch(loadUsers({ pageNumberOrID: 1, searchAction: false }));
    this.router.navigate(['users']);
  }
  searchUser() {
    this.store.dispatch(
      loadUsers({ pageNumberOrID: this.searchUserId, searchAction: true })
    );
  }
}
