import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './users';
import { ConfigAPI } from './service/api/config';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersUrl = ConfigAPI.USER_URL; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  /** GET User by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.usersUrl}/?id=${id}`;
    return this.http.get<User[]>(url).pipe(
      map((users) => users[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} User id=${id}`);
      }),
      catchError(this.handleError<User>(`getHero id=${id}`))
    );
  }

  /** GET User by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap((_) => this.log(`fetched User id=${id}`)),
      catchError(this.handleError<User>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty User array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<User[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new User to the server */
  addHero(User: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, User, this.httpOptions).pipe(
      tap((newHero: User) => this.log(`added User w/ id=${newHero.id}`)),
      catchError(this.handleError<User>('addHero'))
    );
  }

  /** DELETE: delete the User from the server */
  deleteHero(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted User id=${id}`)),
      catchError(this.handleError<User>('deleteHero'))
    );
  }

  /** PUT: update the User on the server */
  updateHero(User: User): Observable<any> {
    return this.http.put(this.usersUrl, User, this.httpOptions).pipe(
      tap((_) => this.log(`updated User id=${User.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
