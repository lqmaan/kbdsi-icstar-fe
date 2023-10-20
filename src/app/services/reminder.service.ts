import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Reminder} from '../models/reminder';
import {PageReminder} from '../models/page-reminder';
import {Delete} from '../models/delete';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private reminderUrl:string;
  private pageReminder: PageReminder;
  
  constructor(private http:HttpClient) {
    this.reminderUrl = 'https://kbdsi-icstar-d22f3974b870.herokuapp.com/api/reminders'
    this.pageReminder = new PageReminder();
  }

  public findAll(data: PageReminder):Observable<any>{

    let reminderParam = new HttpParams()
    .set('description', data.description)
    .set('status', data.status)
    .set('pageNum', data.pageNum)
    .set('pageSize',data.pageSize)

    return this.http.get<PageReminder>(`${this.reminderUrl}/description`, {params:reminderParam})
  }

  public editReminder(reminder: Reminder):Observable<Reminder>{
    return this.http.put<Reminder>(`${this.reminderUrl}/${reminder.reminderId}`, reminder)
  }

  public createReminder(reminder: Reminder):Observable<any>{
    return this.http.post<Reminder>(`${this.reminderUrl}`, reminder)
  }

  public deleteReminder(data: Delete):Observable<any>{
    return this.http.put(`${this.reminderUrl}/delete/${data.id}`, data, {responseType: "text"});
  }

  public downloadExcel(){
    window.location.href = `${this.reminderUrl}/export-to-excel`;
  }
}
