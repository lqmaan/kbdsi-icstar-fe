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
    window.location.href="https://docs.google.com/document/d/1XmbbUYaAvA3hwtVO9os2-6-wypeK5NxNWFM4BL7I3Mc/edit#heading=h.pmyqxlzi8v3z"
  }
}
