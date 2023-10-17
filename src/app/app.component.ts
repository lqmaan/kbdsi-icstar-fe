import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import Swal from 'sweetalert2';
import { Router, NavigationEnd } from '@angular/router';

import {Observable} from 'rxjs';
import {LoginService} from './services/login.service';

declare function greet(): void;
// import { Modal } from 'flowbite';


// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/mergeMap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KBDSI-app';

  isLoggedIn$: Observable<boolean>;

  blankUrl = '';
	currentUrl: string;
	checkoutUrls = ['/login'];

  constructor(private router: Router, private loginService: LoginService) {
    console.log("test", router.events)
		// router.events.forEach(
		// 	(event) => {
		// 		if (event instanceof NavigationEnd) {
		// 		  this.currentUrl= event.url;
		// 		  //Based on the routed URL, Sidebar in the main page will expand or collapse.
		// 		//   this.checkURL();
		// 		}
		// 	  }
		// )
			// e => e instanceof NavigationEnd)
			// .subscribe((e: NavigationEnd) => {
			// 	this.currentUrl = e.url;
			// 	setTimeout(callback => {
			// 		window.scrollTo(0, 0);
			// 	}, 100)
			// });

	// router.events.forEach();
    }


   ngOnInit(): void {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
    // this.login = localStorage.getItem('email') == "" || localStorage.getItem('email') == null ? true : false;
    
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





