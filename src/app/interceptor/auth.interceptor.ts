import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { exhaustMap, take } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _AuthService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return this._AuthService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request)
        }
        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth',user.token)
        })
        return next.handle(modifiedRequest);

      })
    )
  }
}
