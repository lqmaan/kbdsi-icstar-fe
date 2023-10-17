import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Router } from '@angular/router';
import {ReminderService} from '../../services/reminder.service';
import {PageReminder} from '../../models/page-reminder';
import {Reminder} from '../../models/reminder';
import {Delete} from '../../models/delete';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html', 
  template: '<button (click)="showSweetAlert()">Show SweetAlert</button>',
  

  styleUrls: ['./reminder.component.css']
})


export class ReminderComponent implements OnInit {

  reminders: Reminder[] = [];
  pageReminder : PageReminder;
  description: string;
  delete: Delete;

  constructor(private reminderService: ReminderService, public router: Router) {
    this.pageReminder = new PageReminder();
    this.delete = new Delete();
  }

  ngOnInit(){
    this.pageReminder.description = "";
    this.pageReminder.status = "ongoing";
    this.pageReminder.pageNum = 0;
    this.pageReminder.pageSize = 5;
    this.reminderService.findAll(this.pageReminder).subscribe(data => {
      this.reminders = data.content;
    })
  }


  handleSearch(input: string): void{
    this.pageReminder.description = input;
    this.reminderService.findAll(this.pageReminder).subscribe(data => {
      this.reminders = data.content;
    })
  }

  confirmBox(reminder: Reminder){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.delete.id = reminder.reminderId;
        this.delete.updatedBy = localStorage.getItem("email") || "null";
        this.reminderService.deleteReminder(this.delete).subscribe(result => {
          this.reminderService.findAll(this.pageReminder).subscribe(data => {
            this.reminders = data.content;
          })
          if(result == "Reminder has been deleted"){
            Swal.fire(
              'Deleted!',
              'Reminder has been deleted.',
              'success'
            ) 
          }
        }
        , error => {
            Swal.fire({
              title: 'Delete Reminder Failed',
              icon:'error'
            })
            console.log(error);
          })
      } 
    })
  }
  
  downloadExcel(){
    this.reminderService.downloadExcel();
  }

  gotoEditReminder(reminder: Reminder){
    this.router.navigateByUrl('/reminder-update', {state: reminder});
  }
  
 openTab = 1;
  toggleTabs($tabNumber: number, status: string){
    this.openTab = $tabNumber;
    this.pageReminder.status = status;
    console.log(this.pageReminder);
  }
}
