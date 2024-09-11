import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandlerFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';

const baseURL = 'http://localhost:8080/api';

export const urlInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  console.log('Intercepted HTTP call');
  const apiReq = req.clone({ url: `${baseURL}/${req.url}` });
  console.log(apiReq);
  return next(apiReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        console.log('this is client side error');
        errorMsg = `Client Error: ${error.error.message}`;
      } else {
        console.log('this is server side error');
        errorMsg = `Server Error Code: ${error.status}, Message: ${error.message}`;
      }

      console.log(errorMsg);
      return throwError(() => errorMsg);
    })
  );
};

// export const loggingInterceptorFunctional: HttpInterceptorFn = (req, next) => {
//   console.log('Request URL: ' + req.url);
//   return next(req).pipe(
//     catchError((error: HttpErrorResponse) => {
//       console.error('Logging Interceptor Functional Error:', error);
//       return throwError(() => error);
//     })
//   );
// };
