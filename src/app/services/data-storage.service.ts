import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';
import { map , tap } from "rxjs/operators";
@Injectable({
  providedIn: 'root',

})

export class DataStorageService {

  constructor(private _HttpClient:HttpClient ,
    private _RecipeService:RecipeService
    ) { }
    storeRecipe(){
      const recipes = this._RecipeService.getRecipes()
      return this._HttpClient.put(`https://auth-max-505bd-default-rtdb.firebaseio.com/recipes.json`, recipes).subscribe((resposne) => {
        console.log(resposne);
      })
    }
    fetchRecipes(){
      return this._HttpClient.get<Recipe[]>(`https://auth-max-505bd-default-rtdb.firebaseio.com/recipes.json`)
      .pipe(map(
        recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
               ingridents: recipe.ingridents ? recipe.ingridents : []
            };
          })
        }),tap(recipes => {
           this._RecipeService.setRecipes(recipes)
        })
      )}
}
