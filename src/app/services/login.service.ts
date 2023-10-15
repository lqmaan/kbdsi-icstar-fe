import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import {Observable, BehaviorSubject} from 'rxjs';
import {Login} from '../models/login';  

@Injectable()
export class LoginService {
  private loginUrl: string;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {
    this.loginUrl = "https://kbdsi-icstar-d22f3974b870.herokuapp.com/api/login";
  }

  public login(login: Login){
    this.loggedIn.next(true);
    return this.http.post<any>(this.loginUrl, login);
  }

  public logout(){
    localStorage.clear();
    this.loggedIn.next(false);
  }
}
