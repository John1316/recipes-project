import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';
import { map , tap , take, exhaustMap} from "rxjs/operators";
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',

})

export class DataStorageService {

  constructor(private _HttpClient:HttpClient ,
    private _RecipeService:RecipeService,
    private _AuthService:AuthService
    ) { }
    storeRecipe(){
      const recipes = this._RecipeService.getRecipes()
      return this._HttpClient.put(`https://auth-max-505bd-default-rtdb.firebaseio.com/recipes.json`, recipes).subscribe((resposne) => {
        console.log(resposne);
      })
    }
    fetchRecipes(){
      // return this._AuthService.user.pipe(
      // take(1),
      // exhaustMap(user => {


      //   return this._HttpClient.get<Recipe[]>
      //   (`https://auth-max-505bd-default-rtdb.firebaseio.com/recipes.json`,
      //     {
      //       params: new HttpParams().set('auth', user.token)
      //     }
      //   )
      // }),
      // map(recipes => {
      //   return recipes.map(recipe => {
      //     return {
      //       ...recipe,
      //        ingridents: recipe.ingridents ? recipe.ingridents : []
      //     };
      //   })
      // }),
      // tap(recipes => {
      //    this._RecipeService.setRecipes(recipes)
      // })
      // )



        return this._HttpClient.get<Recipe[]>
        (`https://auth-max-505bd-default-rtdb.firebaseio.com/recipes.json`,

        ).pipe(

      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
             ingridents: recipe.ingridents ? recipe.ingridents : []
          };
        })
      }),
      tap(recipes => {
         this._RecipeService.setRecipes(recipes)
      })
      )
  }
}
