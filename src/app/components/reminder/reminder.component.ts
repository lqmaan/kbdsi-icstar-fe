import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Router } from '@angular/router';
import {ReminderService} from '../../services/reminder.service';
import {PageReminder} from '../../models/page-reminder';
import {Reminder} from '../../models/reminder';

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

  constructor(private reminderService: ReminderService, public router: Router) {
    this.pageReminder = new PageReminder();
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

  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // Swal.fire({
        //   title: 'Edit Transaction Success',
        // }).then((result) => {
        //     this.gotoTransactionList();
        //   })
        // }, error => {
        //   Swal.fire({
        //     title: 'Edit Transaction Failed',
        //     icon:'error'
        //   })
        //   console.log(error);
        // }
      } 
    })
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
