import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import type { Ingredient } from '../types/types';
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}

  getInventoryList(): Observable<Ingredient[]> {
    return this.http
      .get<Ingredient[]>('ingredients')
      .pipe(catchError(this.handleError));
  }

  getInventoryIngredient(id: number): Observable<Ingredient> {
    return this.http
      .get<Ingredient>(`ingredients/${id}`)
      .pipe(catchError(this.handleError));
  }

  addInventoryIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http
      .post<Ingredient>('ingredients', ingredient)
      .pipe(catchError(this.handleError));
  }

  updateInventory(id: number, ingredient: Ingredient): Observable<Ingredient> {
    return this.http
      .put<Ingredient>(`ingredients/${id}`, ingredient)
      .pipe(catchError(this.handleError));
  }

  deleteInventory(id: number): Observable<void> {
    return this.http
      .delete<void>(`ingredients/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
