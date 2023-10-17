import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Budget} from '../models/budget';
import {PageBudget} from '../models/page-budget';
import {Delete} from '../models/delete';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budget:Budget[] = [];
  private budgetUrl: string;
  private pageBudget: PageBudget;


  constructor(private http:HttpClient) {
    this.budgetUrl = 'https://kbdsi-icstar-d22f3974b870.herokuapp.com/api/budget'
    this.pageBudget = new PageBudget();

  }


  public findAll(data: PageBudget):Observable<any>{
    console.log(data)

    let budgetParam = new HttpParams()
    .set('year', data.year)
    .set('pageNum', data.pageNum)
    .set('pageSize',data.pageSize)
    return this.http.get<PageBudget>(`${this.budgetUrl}/year`, {params:budgetParam})
  }

  public editBudget(budget: Budget):Observable<Budget>{
    return this.http.put<Budget>(`${this.budgetUrl}/${budget.budgetId}`, budget)
  }

  public createBudget(budget: Budget):Observable<any>{
    return this.http.post<Budget>(`${this.budgetUrl}`, budget)
  }

  public deleteBudget(data: Delete):Observable<any>{
    return this.http.put(`${this.budgetUrl}/delete/${data.id}`, data, {responseType: "text"})
  }

  public getTotalYear(year: number):Observable<any>{
    return this.http.get<number[]>(`${this.budgetUrl}/total/${year}`);
  }

  public downloadExcel(year: string){
    window.location.href = `https://kbdsi-icstar-d22f3974b870.herokuapp.com/api/budgeting/export-to-excel/${year}`;
  }

}
