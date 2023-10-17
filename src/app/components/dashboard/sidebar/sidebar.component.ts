import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener, OnDestroy } from '@angular/core';
import { navbarData } from './nav-data';
// import { faCoffee } from '@fontawesome/free-solid-svg-icons';
// import { CommonModule } from '@angular/common';

import {LoginService} from '../../../services/login.service';
import {NavbarService} from '../../../services/navbar.service';
import {Observable, Subscription} from 'rxjs';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})

export class SidebarComponent implements OnInit, OnDestroy {
    showSidebar: boolean;
    subscription: Subscription;
    isLoggedIn$: Observable<boolean>;

    @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
    collapsed = false;
    screenWidth = 0;
    navData = navbarData;

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.screenWidth = window.innerWidth;
      if(this.screenWidth <= 768 ) {
        this.collapsed = false;
        this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
      }
    }

    constructor(private loginService: LoginService, private navbarService: NavbarService) {
      // this.subscription =  this.navbarService.showSidebar.subscribe((value) => {
      //   this.showSidebar = value;
      // })
    }

    ngAfterViewInit() {
      setTimeout(()=>
      this.subscription =  this.navbarService.showSidebar.subscribe((value) => {
        this.showSidebar = value;
      }),0)
    }

    ngOnInit(): void {
        this.screenWidth = window.innerWidth;
        this.isLoggedIn$ = this.loginService.isLoggedIn;
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe()
    }

    toggleCollapse(): void {
      this.collapsed = !this.collapsed;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }

    closeSidenav(): void {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }

    Logout(){
      this.loginService.logout();
    }
  }
