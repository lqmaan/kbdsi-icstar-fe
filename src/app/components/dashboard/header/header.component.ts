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
    window.location.href="https://drive.google.com/drive/u/6/folders/1CI4_rvC9SPGXxiHPqr-P1z4O9AncgVPt"
  }
}
