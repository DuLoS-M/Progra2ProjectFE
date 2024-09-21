import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginUser, User } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>('users').pipe(catchError(this.handleError));
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`users/${id}`)
      .pipe(catchError(this.handleError));
  }

  addUser(User: User): Observable<User> {
    return this.http
      .post<User>('users', User)
      .pipe(catchError(this.handleError));
  }

  updateUser(id: number, User: User): Observable<User> {
    return this.http
      .put<User>(`users/${id}`, User)
      .pipe(catchError(this.handleError));
  }

  deleteUser(id: number): Observable<void> {
    return this.http
      .delete<void>(`users/${id}`)
      .pipe(catchError(this.handleError));
  }

  login(User: LoginUser): Observable<User> {
    return this.http
      .post<User>('users/login', User)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
