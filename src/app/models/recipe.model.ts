import { Ingrident } from "./ingrident.model";

export class Recipe{
  public name:string;
  public description:string;
  public imagePath:string;
  public ingridents : Ingrident[]
  constructor(name:string , description:string , imagePath:string , ingridents:Ingrident[]){
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingridents = ingridents;
  }

}
