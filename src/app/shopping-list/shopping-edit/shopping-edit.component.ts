import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingrident } from 'src/app/models/ingrident.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild('editShoppingList') shoppingListForm!: NgForm;
  subscription!: Subscription;
  editMode= false;
  editItemIndex!: number;
  EditedItem!:Ingrident;
  // @ViewChild('nameInput') nameInputRef!:ElementRef;
  // @ViewChild('amountInput') amountInputRef!:ElementRef;
  // @Output()  ingeridentAdded = new EventEmitter<Ingrident>()
  constructor(private _ShoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this._ShoppingListService.startEditing.subscribe(
      (index:number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.EditedItem = this._ShoppingListService.getIngridentItem(index)
        this.shoppingListForm.setValue({
          name: this.EditedItem.name,
          amount: this.EditedItem.amount,
        })
      }
    )
  }
  onSubmit(form: NgForm){
    const value = form.value;
    // const nameAdded = this.nameInputRef.nativeElement.value;
    // const amountAdded = this.amountInputRef.nativeElement.value;
    const newIngrident = new Ingrident(value.name , value.amount);
    // this.ingeridentAdded.emit(newIngrident);
    if (this.editMode) {
      this._ShoppingListService.updateIngrident(this.editItemIndex ,  newIngrident)
    }else{
      this._ShoppingListService.addingrident(newIngrident);

    }
    this.editMode =  false;
    form.reset()
  }
  onClear(){
    this.editMode = false
    this.shoppingListForm.reset()
  }
  onDelete(){
    this._ShoppingListService.deleteIngrident(this.editItemIndex)
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
