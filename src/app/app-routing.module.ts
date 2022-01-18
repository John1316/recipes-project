import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes:Routes = [
  {path: '' , redirectTo:'/recipes' ,pathMatch:'full'},
  {path: 'shoppingList' , component:ShoppingListComponent},
  {path: 'recipes' , component:RecipesComponent , children:[
    {path: '' , component:RecipeStartComponent},
    {path: 'new' , component:RecipeEditComponent},
    {path: ':id' , component:RecipeDetailComponent},
    {path: ':id/edit' , component:RecipeEditComponent},
    // {path: '' , component:}
  ]},
  {path: '**' , component:NotfoundComponent},
]


@NgModule({
  imports: [
    // RouterModule.forRoot(routes , {useHash: true})
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
