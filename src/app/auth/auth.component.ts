import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false
  error: string = '';
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }
  constructor(private _AuthService:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(authForm: NgForm){
    console.log(authForm.value)
    let authObservable:Observable<any>;
    this.isLoading= true;
    const email = authForm.value.email;
    const password = authForm.value.password;
    if(!authForm.valid){
      return;
    }
    if (this.isLoginMode) {

      authObservable =  this._AuthService.signIn(email,password)
    }else{

      authObservable = this._AuthService.signUp(email,password)
    }

    authObservable.subscribe(
      responseAuth => {
        this.isLoading = false

        console.log(responseAuth);
      }, errorMessage => {
        this.isLoading = false
        this.error = errorMessage
      }
    )
    authForm.reset()
  }
}
