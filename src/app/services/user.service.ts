import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
import {PageUser} from '../models/page-user';
import {Delete} from '../models/delete';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  private usersUrl:string;
  private pageUser: PageUser;
  
  constructor(private http:HttpClient) {
    this.usersUrl = 'https://kbdsi-icstar-d22f3974b870.herokuapp.com/api/users'
    this.pageUser = new PageUser();
  }

  public findAll(data: PageUser):Observable<any>{
    console.log(data)

    let userParam = new HttpParams()
    .set('name', data.name)
    .set('pageNum', data.pageNum)
    .set('pageSize',data.pageSize)

    console.log(userParam)
    return this.http.get<PageUser>(`${this.usersUrl}/name`, {params:userParam})
  }

  public createUser(user: User):Observable<any>{
    return this.http.post<User>(`${this.usersUrl}`, user)
  }

  public editUser(user: User):Observable<User>{
    return this.http.put<User>(`${this.usersUrl}/${user.userId}`, user)
  }

  public deleteUser(data: Delete){
    return this.http.put(`${this.usersUrl}/delete/${data.id}`,data, {responseType: "text"})
  }
}
