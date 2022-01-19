import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { DataStorageService } from '../services/data-storage.service';
import { RecipeService } from '../services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {

  constructor(
    private _DataStorageService:DataStorageService,
    private _RecipeService:RecipeService
    ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this._RecipeService.getRecipes();
    if (recipes.length ===0) {
      return this._DataStorageService.fetchRecipes()
    }else{
      return recipes
    }
  }
}
