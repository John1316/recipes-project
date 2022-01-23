import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _AuthService:AuthService,
    private _Router:Router
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any | UrlTree |Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._AuthService.user.pipe(
      take(1),
      map(user => {
        const isAuthenticated =  !!user;
        if (isAuthenticated) {
          return true;
        }
        return this._Router.createUrlTree(['/auth'])
      }
    ))
  }

}
