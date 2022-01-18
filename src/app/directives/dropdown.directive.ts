import { Directive , HostBinding , HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.show') IsShown = false;
  constructor() { }
  @HostListener('click') click(){
    this.IsShown = !this.IsShown;
  }
}
