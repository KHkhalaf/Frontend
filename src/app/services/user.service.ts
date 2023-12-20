import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  debounceTime,
  map,
  of,
  takeUntil,
} from 'rxjs';
import { User } from '../user-config/modules/user';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://reqres.in/api/users';
  response$ = this.store.select((state) => state.response);
  currentPage: number;
  totalPages: number;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getResponse(pageNumberOrID: number, searchAction: boolean): Observable<any> {
    const url =
      searchAction && pageNumberOrID != null
        ? `${this.baseUrl}/${pageNumberOrID}`
        : `${this.baseUrl}?page=${pageNumberOrID}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        if (error.status === 404) {
          console.error('404 Error: Resource not found');
        } else {
          console.error('An error occurred:', error);
        }
        return of(null);
      })
    );
  }

  getUserById(id?: number): User {
    let user: User = {} as User;
    this.response$?.subscribe((firstItem) => {
      let users = Array.isArray(firstItem.data)
        ? (firstItem.data as User[])
        : [firstItem.data as User];
      user = users.filter((user) => user.id == id)[0];
    });
    return user;
  }
}
