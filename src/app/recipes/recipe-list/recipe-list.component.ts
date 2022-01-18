import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {

  recipeContainer = [];
  recipes!: Recipe[];
  subscription!: Subscription;
  constructor(private _RecipeService:RecipeService,
    private _Router:Router,
    private _ActivatedRoute:ActivatedRoute

    ) { }

  ngOnInit(): void {
    this.recipes = this._RecipeService.getRecipes();
    this.subscription = this._RecipeService.recipeChanged.subscribe(
      (recipes:Recipe[])=>{
        this.recipes = recipes
      }
    )
    // this.recipeContainer = recipes;
  }
  onNewRecipe(){
    this._Router.navigate(['new'] ,  {relativeTo:this._ActivatedRoute})
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
