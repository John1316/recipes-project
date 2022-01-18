import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute , Params, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!:number;
  constructor(private _RecipeService:RecipeService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router
    ) { }

  ngOnInit() {
    this._ActivatedRoute.params.subscribe(
      (params:Params) => {
        this.id  =  +params["id"]
        this.recipe  =  this._RecipeService.getRecipe(this.id)
      }
    )
  }
  onAddShoppingList(){
    this._RecipeService.addIngridentShoppingList(this.recipe.ingridents)
  }
  onEditRecipe(){
    this._Router.navigate(['edit'] , {relativeTo: this._ActivatedRoute})
    // this._Router.navigate(['../' , this.id , 'edit' ] , {relativeTo:this._ActivatedRoute})
  }
  onDeleteRecipe(){
    this._RecipeService.deleteRecipe(this.id)
    this._Router.navigate(['/recipes'])
  }
}
