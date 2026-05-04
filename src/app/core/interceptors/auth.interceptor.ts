import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshSubject = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const clonedReq = req.clone({
      withCredentials: true
    });

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {

        // 🔥 prevent infinite loop
        if (error.status === 401 && !req.url.includes('/auth/refresh')) {
          return this.handle401Error(clonedReq, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap(() => {
          this.isRefreshing = false;
          this.refreshSubject.next(true);
          return next.handle(req);
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.authService.handleLogout();
          return throwError(() => err);
        })
      );
    }

    return this.refreshSubject.pipe(
      filter(result => result !== null),
      take(1),
      switchMap(() => next.handle(req))
    );
  }
}