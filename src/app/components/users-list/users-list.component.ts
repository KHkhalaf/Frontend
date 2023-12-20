import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  map,
  shareReplay,
  takeUntil,
} from 'rxjs';
import { User } from 'src/app/user-config/modules/user';
import { loadUsers } from 'src/app/user-config/user.actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  private ngUnsubscribe = new Subject<void>();
  users?: Observable<any>;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  response$ = this.store.select((state) => state.response);
  loading$ = this.store.select((state) => state.loading);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.response$
      ?.pipe(takeUntil(this.ngUnsubscribe), debounceTime(300))
      .subscribe((firstItem) => {
        this.currentPage = firstItem.page;
        this.totalPages = firstItem.total_pages;
        if (Array.isArray(firstItem.data))
          this.users = this.response$.pipe(map((data) => data.data));
        else {
          const sub = new BehaviorSubject<User[] | null>(null);
          sub.next([firstItem.data as User]);
          this.users = sub.asObservable();
        }
      });

    this.loading$.subscribe((l) => (this.isLoading = l.isLoading));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  nextPage() {
    this.users = undefined;
    this.currentPage++;
    this.store.dispatch(
      loadUsers({ pageNumberOrID: this.currentPage, searchAction: false })
    );
  }

  prevPage() {
    this.users = undefined;
    this.currentPage--;
    this.store.dispatch(
      loadUsers({ pageNumberOrID: this.currentPage, searchAction: false })
    );
  }
}
