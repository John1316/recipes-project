import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingrident } from '../models/ingrident.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [

    new Recipe(
      'aTest name recipe',
      'This a decription test',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS18ulMGyMk3iLNlzsRNKZiBuOAMK2j3EbfmQ&usqp=CAU'
      ,[
        new Ingrident('apple',10)
      ]
    ),
    new Recipe(
      'aTest name recipe 1',
      'This a decription test 1',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS18ulMGyMk3iLNlzsRNKZiBuOAMK2j3EbfmQ&usqp=CAU'
      ,[
        new Ingrident('veg',45),
        new Ingrident('fruit',15)
      ]
    ),
    new Recipe(
      'aTest name recipe 2',
      'This a decription test 2',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS18ulMGyMk3iLNlzsRNKZiBuOAMK2j3EbfmQ&usqp=CAU'
      ,[
        new Ingrident('orange',20)
      ]
    ),
    new Recipe(
      'aTest name recipe 3',
      'This a decription test 3',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS18ulMGyMk3iLNlzsRNKZiBuOAMK2j3EbfmQ&usqp=CAU'
      ,[
        new Ingrident('apple',10)
      ]
    )

  ];
  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice())

  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index:number){
    return this.recipes[index]
    // return this.recipes.slice()[index]
  }
  updateRecipe(index:number, newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice())

  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice())
  }
  constructor(private _ShoppingListService:ShoppingListService) { }
  addIngridentShoppingList(ingridents:Ingrident[]){
    this._ShoppingListService.addIngridents(ingridents)
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice())
  }
}
