import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Category} from '../models/category';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryUrl:string;
  private Category: Category;
  
  constructor(private http:HttpClient) {
    this.categoryUrl = 'https://kbdsi-icstar-d22f3974b870.herokuapp.com/api/category'
  }

  public findAll():Observable<any>{
    return this.http.get<any>(`${this.categoryUrl}`)
  }
}
