import { Component } from '@angular/core';
import { heroQuestionMarkCircle } from '@ng-icons/heroicons/outline';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(){

  }

  gotoManual(){
    window.location.href="https://www.google.com/"
  }
}
