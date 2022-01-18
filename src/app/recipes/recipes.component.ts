import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  // recipeSelected!: Recipe;
  constructor(private _RecipeService:RecipeService) { }

  ngOnInit(): void {
    // this._RecipeService.selectedRecipe.subscribe((recipe:Recipe)=>{
    //   this.recipeSelected = recipe
    // })
  }

}
