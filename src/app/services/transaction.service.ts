import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Transaction} from '../models/transaction';
import {PageBookkeeping} from '../models/page-bookkeeping';
import {PageTransaction} from '../models/page-transaction';
import {Delete} from '../models/delete';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions: Transaction[] = [];
  private transactionsUrl:string;
  private pageBookkeeping: PageBookkeeping;
  private pageTransaction: PageTransaction;
  
  constructor(private http:HttpClient) {
    this.transactionsUrl = 'https://kbdsi-icstar-d22f3974b870.herokuapp.com/api/transactions'
    this.pageBookkeeping = new PageBookkeeping();
    this.pageTransaction = new PageTransaction();

  }

  public findAllTransaction(data: PageTransaction):Observable<any>{

    let transactionParam = new HttpParams()
    .set('description', data.description)
    .set('pageNum', data.pageNum)
    .set('pageSize',data.pageSize)
    return this.http.get<PageTransaction>(`${this.transactionsUrl}/description`, {params:transactionParam})
  }

  public editTransaction(transaction: Transaction):Observable<Transaction>{
    return this.http.put<Transaction>(`${this.transactionsUrl}/${transaction.transactionId}`, transaction)
  }

  public createTransaction(transaction: Transaction):Observable<any>{
    return this.http.post<Transaction>(`${this.transactionsUrl}`, transaction)
  }

  public deleteTransaction(data: Delete){
    return this.http.put(`${this.transactionsUrl}/delete/${data.id}`, data, {responseType: 'text'})
  }


  public findAllBookkeeping(data: PageBookkeeping):Observable<any>{

    let bookkeepingParam = new HttpParams()
    .set('category', data.category)
    .set('year', data.year)
    .set('startDate', data.startDate)
    .set('endDate', data.endDate)
    .set('pageNum', data.pageNum)
    .set('pageSize',data.pageSize)
    return this.http.get<PageBookkeeping>(`${this.transactionsUrl}/bookkeeping`, {params:bookkeepingParam})
  }

  public getHighestIncome():Observable<any>{
    return this.http.get<Transaction>(`${this.transactionsUrl}/max-income`);
  }

  public getHighestOutcome():Observable<any>{
    return this.http.get<Transaction>(`${this.transactionsUrl}/max-outcome`);
  }

  public getLowestIncome():Observable<any>{
    return this.http.get<Transaction>(`${this.transactionsUrl}/min-income`);
  }

  public getLowestOutcome():Observable<any>{
    return this.http.get<Transaction>(`${this.transactionsUrl}/min-outcome`);
  }

  public getIncome():Observable<any>{
    return this.http.get<Transaction>(`${this.transactionsUrl}/income`);
  }

  public getOutcome():Observable<any>{
    return this.http.get<Transaction>(`${this.transactionsUrl}/outcome`);
  }

  public getTotalMonth(month: number):Observable<any>{
    return this.http.get<number[]>(`${this.transactionsUrl}/total/month/${month}`);
  }

  public getTotalYear(year: number):Observable<any>{
    return this.http.get<number[]>(`${this.transactionsUrl}/total/year/${year}`);
  }

  public downloadExcel(){
    window.location.href = `${this.transactionsUrl}/export-to-excel`;
  }

}
