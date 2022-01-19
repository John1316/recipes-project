import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface AuthResponseData{
  idToken:string;
  refreshToken:string;
  email: string;
  expiresIn: string;
  localId:string;
  registered?:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }
  signUp<AuthResponseData>(email:string , password:string){
    return this._HttpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8aAWrNt6IJw8i_adphgdYgKZxffhKlRQ` ,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorResponse => {
        let errorMessage = 'Something have occured';
        if (!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage)
        }
        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS':
          errorMessage = 'Email already Exists'
        }
        return throwError(errorMessage)
      }))
  }
  signIn<AuthResponseData>(email:string , password:string){
    return this._HttpClient.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8aAWrNt6IJw8i_adphgdYgKZxffhKlRQ` ,
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
}
