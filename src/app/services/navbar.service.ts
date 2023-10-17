import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  showSidebar: BehaviorSubject<boolean>;

  constructor() {
    this.showSidebar = new BehaviorSubject(true);
   }

   hide(){
    this.showSidebar.next(false);
   }

   display(){
    this.showSidebar.next(true);
   }
}

