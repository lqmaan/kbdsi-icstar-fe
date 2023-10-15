import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';

import {Observable} from 'rxjs';
import {LoginService} from './services/login.service';

declare function greet(): void;
// import { Modal } from 'flowbite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KBDSI-app';

  isLoggedIn$: Observable<boolean>;

  constructor(private loginService: LoginService) { }

  simpleAlert(){
    Swal.fire(
      'simple Notification');
  }



   ngOnInit(): void {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
    // this.login = localStorage.getItem('email') == "" || localStorage.getItem('email') == null ? true : false;
    
    initFlowbite();
  }

}





