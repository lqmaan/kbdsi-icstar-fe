import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(){
    if(localStorage.getItem('email') != ""){
      return true;
    }
    else{
      return false;
    }
  }
}

