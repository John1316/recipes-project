import { Injectable ,  EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import {Ingrident} from '../models/ingrident.model'
@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingeridentChanged = new Subject<Ingrident[]>()
  startEditing = new Subject<number>();
  ingridents: Ingrident[]=[
      new Ingrident('Apple', 1),
      new Ingrident('Vegtables', 4),
      new Ingrident('fruits', 10),
      new Ingrident('veg', 52),
  ]
  // =  [
    // ]
  constructor() { }
  getShoppingList(){
    return this.ingridents.slice()
  }
  getIngridentItem(index:number){
    return this.ingridents[index]
  }
  addingrident(ingridents:Ingrident){
    this.ingridents.push(ingridents)
    this.ingeridentChanged.next(this.ingridents.slice())
  }
  addIngridents(ingridents:Ingrident[]){
    // for (let ingrident of ingridents) {
      // }
      this.ingridents.push(...ingridents)
      this.ingeridentChanged.next(this.ingridents.slice())

  }
  updateIngrident(index:number , newIngrident:Ingrident){
    this.ingridents[index] = newIngrident
    this.ingeridentChanged.next(this.ingridents.slice())
  }
  deleteIngrident(index:number){
    this.ingridents.splice(index , 1)
    this.ingeridentChanged.next(this.ingridents.slice())
  }
}
