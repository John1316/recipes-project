import { Component,
  // EventEmitter,
  OnInit,
  // Output
} from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Output() featureSelected = new EventEmitter<string>()
  // onSelect(feature:string){
    //   this.featureSelected.emit(feature)
    // }
    onSaveData(){
      this._DataStorageService.storeRecipe()
    }
    onFetchData(){
      this._DataStorageService.fetchRecipes().subscribe((getData) => {
        this._RecipeService.setRecipes(getData)
      })
    }
  constructor(private _DataStorageService:DataStorageService ,
    private _RecipeService:RecipeService
    ) { }
  ngOnInit(): void {
  }

}
