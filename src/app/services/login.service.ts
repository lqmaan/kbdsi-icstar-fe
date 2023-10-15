import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import {Observable} from 'rxjs';
import {Login} from '../models/login';  

@Injectable()
export class LoginService {
  private loginUrl: string;

  constructor(private http: HttpClient) {
    this.loginUrl = "https://kbdsi-icstar-d22f3974b870.herokuapp.com/api/login";
  }

  public login(login: Login){
    return this.http.post<any>(this.loginUrl, login);
  }

  public logout(){
    
  }

  gotoLoginPage(){

  }
}
