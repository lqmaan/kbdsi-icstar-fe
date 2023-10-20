import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';  
import {Reminder} from '../../models/reminder';
import {User} from '../../models/user';
import {ReminderService} from '../../services/reminder.service';
import {UserService} from '../../services/user.service';

import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-reminder-create',
  templateUrl: './reminder-create.component.html',
  styleUrls: ['./reminder-create.component.css']
})
export class ReminderCreateComponent {
  reminder: Reminder;
  users: User[] = [];
  pipe = new DatePipe("id-ID");
  currDate : Date;
  reminderForm: FormGroup

  constructor(private route: ActivatedRoute,
    private router: Router, private userService: UserService, 
    private reminderService: ReminderService,
    private currencyPipe: CurrencyPipe,
    private fb: FormBuilder
    ){
      this.reminder = new Reminder();
      this.currDate = new Date();
    }

  ngOnInit(){
    if(localStorage.getItem('email') == "" || localStorage.getItem('email') == null){
      this.router.navigateByUrl('/login');
    }
    else
    {
    this.userService.findAll().subscribe((result) => {
      this.users = result;
    })
    this.reminderForm = this.fb.group({  
      description : new FormControl(''),  
      repeated: new FormControl(''),
      email: new FormControl(''),
      scheduleDate : new FormControl(''),
      paymentDate : new FormControl(''),
      amount : new FormControl(''),
  });

this.reminderForm.valueChanges.subscribe(form => {
  if(form.amount){
    this.reminderForm.patchValue({
      amount: this.currencyPipe.transform(form.amount.toString().replace(/\D/g, '').replace(/^0+/,''), 'IDR', 'symbol', '1.0-0')
    }, {emitEvent : false})
  }
  })
    }
  }

onItemChange(data: any){
  this.reminder.repeated = data.target.defaultValue;
}


  onSubmit(){
    this.reminder.createdBy =  localStorage.getItem('email') || "null";
    this.reminder.description = this.reminderForm.controls['description'].value;
    this.reminder.email = this.reminderForm.controls['email'].value;
    // this.reminder.amount = this.reminderForm.controls['amount'].value;
    let res = this.reminderForm.controls['amount'].value.replace(/[^0-9.-]+/g,"");
    let tmp = res.split('.').join("");
    this.reminder.amount = Number(tmp);
    this.reminder.scheduleDate = this.pipe.transform(this.reminderForm.controls['scheduleDate'].value, 'dd/MM/yyyy') || "";
    this.reminder.paymentDate = this.pipe.transform(this.reminderForm.controls['paymentDate'].value, 'dd/MM/yyyy') || "";
    this.reminder.status = "ongoing";
    this.reminderService.createReminder(this.reminder).subscribe((result) => {
      Swal.fire({
        title: 'Create Reminder Success',
      }).then((result) => {
          this.gotoReminderList();
        })
      }, error => {
        Swal.fire({
          title: 'Create Reminder Failed',
          icon:'error'
        })
        console.log(error);
      })
  }

  gotoReminderList(){
    this.router.navigate(['/reminder']);
  }
  
  simpleAlert(){
    Swal.fire(
      "Good job!", "You clicked the button!", "success");
  }
}



