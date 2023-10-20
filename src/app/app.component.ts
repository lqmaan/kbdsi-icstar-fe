import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router, NavigationEnd } from '@angular/router';

import {Observable} from 'rxjs';
import {LoginService} from './services/login.service';

declare function greet(): void;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'KBDSI-app';

  isLoggedIn$: Observable<boolean>;

  blankUrl = '';
	currentUrl: string;
	checkoutUrls = ['/login'];

  constructor(private router: Router, private loginService: LoginService) {
    console.log("test", router.events)
    }


   ngOnInit(): void {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
   
    initFlowbite();
  }

  isCheckoutRoute() {
		if (!this.currentUrl) {
			return false;
		}
		const index = this.checkoutUrls.indexOf(this.currentUrl);
		if (index >= 0) {
			return true;
		} else {
			return false;
		}
	}

}





