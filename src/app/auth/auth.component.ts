import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';
import {AlertComponent} from '../shared/alert/alert.component'
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
  constructor(
    private _AuthService:AuthService,
    private _Router:Router,
    private _ComponentFactoryResolver:ComponentFactoryResolver
    ) { }

  ngOnInit(): void {
  }
  onHandleClose(){
    this.error = '';
  }
  onSubmit(authForm: NgForm){
    console.log(authForm.value)
    let authObservable:Observable<AuthResponseData>;
    this.isLoading= true;
    const email = authForm.value.email;
    const password = authForm.value.password;
    if(!authForm.valid){
      return;
    }
    if (this.isLoginMode) {

      authObservable =  this._AuthService.login(email,password)
    }else{

      authObservable = this._AuthService.signup(email,password)
    }

    authObservable.subscribe(
      responseAuth => {
        this.isLoading = false

        console.log(responseAuth);
        this._Router.navigate(['/recipes'])
      }, errorMessage => {
        this.showAlertError()
        this.isLoading = false
        this.error = errorMessage
      }
    )
    authForm.reset()
  }
  private showAlertError(){
    // const alertComponent = new ALertComponent()
    this._ComponentFactoryResolver.resolveComponentFactory(AlertComponent)
  }
}
