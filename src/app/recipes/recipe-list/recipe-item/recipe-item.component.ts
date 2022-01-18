import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Input() index!: number;

  // @Output() selectedRecipe = new EventEmitter<void>();



  ngOnInit(): void {

  }
  // onSelected(){
  //  this._RecipeService.selectedRecipe.emit(this.recipe)
  //  this.selectedRecipe.emit()
  // }

}
