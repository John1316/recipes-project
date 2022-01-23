import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params ,Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!:number;
  editMode= false;

  recipeForm!:FormGroup;
  recipeIngridentContainer: any[]= [];
  constructor(private _ActivatedRoute:ActivatedRoute,
    private _RecipeService:RecipeService,
    private _Router:Router
    ) { }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(
      (params:Params) =>{

        this.id = +params["id"]
        this.editMode = params['id'] != null;
        this.initForm()
      }
    )
    this.initForm()
  }
  onAddIngrident(){
    (<FormArray>this.recipeForm.get('ingridents')).push(
      new FormGroup({
        'name' : new FormControl(null,Validators.required),
        'amount' : new FormControl(null,
          [
            Validators.required,
            Validators.pattern(/[1-9]+[0-9]*$/)
          ]),
      })
    )
  }

  onCancel(){
    this._Router.navigate(['../'], {relativeTo: this._ActivatedRoute})
  }
  onDeleteIngrident(index:number){
    (<FormArray>this.recipeForm.get('ingridents')).removeAt(index)
  }

  get allIngridents() {
    return (<FormArray>this.recipeForm.get('ingridents'))
  }
  onSubmit(){

    if (this.editMode) {

      this._RecipeService.updateRecipe(this.id , this.recipeForm.value)
    }else{
      this._RecipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }
  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngridients = new FormArray([]);
    if (this.editMode) {
      const recipe = this._RecipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      this.recipeIngridentContainer = recipe['ingridents']
      // console.log(recipe['ingridents']);
      if (recipe['ingridents']) {
        for(let ingredients of recipe.ingridents){
          recipeIngridients.push(new FormGroup({
            'name' : new FormControl(ingredients.name , Validators.required),
            'amount' : new FormControl(ingredients.amount ,
              [
                Validators.required,
                Validators.pattern(/[1-9]+[0-9]*$/)
              ]
              ),
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingridents': recipeIngridients
    })
  }
}
