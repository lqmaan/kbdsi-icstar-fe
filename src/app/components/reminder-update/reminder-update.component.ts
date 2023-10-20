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
  selector: 'app-reminder-update',
  templateUrl: './reminder-update.component.html',
  styleUrls: ['./reminder-update.component.css']
})
export class ReminderUpdateComponent {

  reminder: Reminder;
  users: User[] = [];
  pipe = new DatePipe("id-ID");

  predesc: string;
  preemail: string;
  preschedule: string;
  prepayment: string;
  preamount: number;
  prerepeated: boolean;
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
    console.log(history.state)
    this.predesc = history.state.description;
    this.preemail = history.state.email;
    this.preschedule = this.pipe.transform(history.state.scheduleDate, 'yyyy-MM-dd') || "";
    this.prepayment = this.pipe.transform(history.state.paymentDate, 'yyyy-MM-dd') || "";
    this.preamount = history.state.amount;
    this.prerepeated = history.state.repeated;

    this.reminderForm = this.fb.group({  
      description : new FormControl(history.state.description, Validators.required),  
      repeated: new FormControl(history.state.repeated, Validators.required),
      email: new FormControl(history.state.email, Validators.required),
      scheduleDate : new FormControl(history.state.scheduleDate, Validators.required),
      paymentDate : new FormControl(history.state.paymentDate, Validators.required),
      amount : new FormControl(history.state.amount, Validators.required),

  });

this.reminderForm.valueChanges.subscribe(form => {
  if(form.amount){
    this.reminderForm.patchValue({
      amount: this.currencyPipe.transform(form.amount.replace(/\D/g, '').replace(/^0+/,''), 'IDR', 'symbol', '1.0-0')
    }, {emitEvent : false})
  }
  })
  }
  }

onItemChange(data: any){
  this.reminder.repeated = data.target.defaultValue;
}


  onSubmit(){
    this.reminder.reminderId = history.state.reminderId;
    this.reminder.updatedBy =  localStorage.getItem('email') || "null";
    this.reminder.description = this.reminderForm.controls['description'].value;
    // this.reminder.amount = this.reminderForm.controls['amount'].value;
    let res = this.reminderForm.controls['amount'].value.replace(/[^0-9.-]+/g,"");
    let tmp = res.split('.').join("");
    this.reminder.amount = Number(tmp);
    this.reminder.scheduleDate = this.pipe.transform(this.reminderForm.controls['scheduleDate'].value, 'dd/MM/yyyy') || "";
    this.reminder.paymentDate = this.pipe.transform(this.reminderForm.controls['paymentDate'].value, 'dd/MM/yyyy') || "";
    this.reminder.status = history.state.status;
    this.reminder.email = this.reminderForm.controls['email'].value;
    this.reminderService.editReminder(this.reminder).subscribe((result) => {
      Swal.fire({
        title: 'Edit Reminder Success',
      }).then((result) => {
          this.gotoReminderList();
        })
      }, error => {
        Swal.fire({
          title: 'Edit Reminder Failed',
          icon:'error'
        })
        console.log(error);
      })
  }

  gotoReminderList(){
    this.router.navigate(['/reminder']);
  }
}
