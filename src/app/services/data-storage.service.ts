import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',

})

export class DataStorageService {

  constructor(private _HttpClient:HttpClient ,
    private _RecipeService:RecipeService
    ) { }
    storeRecipe(){
      const recipes = this._RecipeService.getRecipes()
      return this._HttpClient.put(`https://project-max-cycle-default-rtdb.firebaseio.com/recipes.json`, recipes).subscribe((resposne) => {
        console.log(resposne);
      })
    }
    fetchRecipes(){
      return this._HttpClient.get<Recipe[]>(`https://project-max-cycle-default-rtdb.firebaseio.com/recipes.json`)
    }
}
