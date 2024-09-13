import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface News {
  id?: number;
  title: string;
  content: string;
  photoUrl?: File; // Change to File type for photo
  publishedAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNewsList(): Observable<News[]> {
    return this.http.get<News[]>('news').pipe(catchError(this.handleError));
  }

  getNews(id: number): Observable<News> {
    return this.http.get<News>(`news/${id}`).pipe(catchError(this.handleError));
  }

  addNews(news: News): Observable<News> {
    const formData = new FormData();
    formData.append('title', news.title);
    formData.append('content', news.content);
    if (news.photoUrl) {
      formData.append('photoUrl', news.photoUrl);
    }

    return this.http
      .post<News>('news', formData)
      .pipe(catchError(this.handleError));
  }

  updateNews(id: number, news: News): Observable<News> {
    const formData = new FormData();
    formData.append('title', news.title);
    formData.append('content', news.content);
    if (news.photoUrl) {
      formData.append('photoUrl', news.photoUrl);
    }
    return this.http
      .put<News>(`news/${id}`, formData)
      .pipe(catchError(this.handleError));
  }

  deleteNews(id: number): Observable<void> {
    return this.http
      .delete<void>(`news/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
