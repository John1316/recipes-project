import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingrident } from '../models/ingrident.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit , OnDestroy {
  ingridents!: Ingrident[]

  private igChangSubscription!: Subscription;
  constructor(private _ShoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingridents =  this._ShoppingListService.getShoppingList();
    this.igChangSubscription =  this._ShoppingListService.ingeridentChanged.subscribe((ingridents:Ingrident[])=>{
      this.ingridents = ingridents
    })
  }
  onEditList(id:number){
    this._ShoppingListService.startEditing.next(id)
  }

  ngOnDestroy(): void {
    this.igChangSubscription.unsubscribe();  }
}
