import { Component,
  OnDestroy,
  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{

    isAuthenticated = false;
    private userSub!: Subscription;

  constructor(private _DataStorageService:DataStorageService ,
    private _AuthService:AuthService,
    private _Router:Router
    ) { }

  ngOnInit() {
    this.userSub = this._AuthService.user.subscribe(user => {
      this.isAuthenticated = !!user
    })
  }
  onLogout(){
    this._AuthService.logout()
  }
  onSaveData(){
    this._DataStorageService.storeRecipe()
  }
  onFetchData(){
    this._DataStorageService.fetchRecipes().subscribe()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
