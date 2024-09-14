import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Dish } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient) {}

  getDishList(): Observable<Dish[]> {
    return this.http.get<Dish[]>('dishes').pipe(catchError(this.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http
      .get<Dish>(`dishes/${id}`)
      .pipe(catchError(this.handleError));
  }

  addDish(Dish: Dish): Observable<Dish> {
    const formData = new FormData();
    formData.append('name', Dish.name);
    formData.append('description', Dish.description);
    if (Dish.photoUrl) {
      formData.append('photoUrl', Dish.photoUrl);
    }
    formData.append('price', Dish.price.toString());
    formData.append('ingredients', JSON.stringify(Dish.ingredients));
    return this.http
      .post<Dish>('dishes', formData)
      .pipe(catchError(this.handleError));
  }

  updateDish(id: number, Dish: Dish): Observable<Dish> {
    const formData = new FormData();
    formData.append('name', Dish.name);
    formData.append('description', Dish.description);
    if (Dish.photoUrl) {
      formData.append('photoUrl', Dish.photoUrl);
    }
    formData.append('price', Dish.price.toString());
    formData.append('ingredients', JSON.stringify(Dish.ingredients));
    return this.http
      .put<Dish>(`dishes/${id}`, formData)
      .pipe(catchError(this.handleError));
  }

  deleteDish(id: number): Observable<void> {
    return this.http
      .delete<void>(`dishes/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
