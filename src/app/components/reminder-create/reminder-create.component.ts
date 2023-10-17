import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';



import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';  
import {Reminder} from '../../models/reminder';
import {User} from '../../models/user';
import {ReminderService} from '../../services/reminder.service';
import {UserService} from '../../services/user.service';



@Component({
  selector: 'app-reminder-create',
  templateUrl: './reminder-create.component.html',
  styleUrls: ['./reminder-create.component.css']
})
export class ReminderCreateComponent {
  reminder: Reminder;
  users: User[] = [];
  pipe = new DatePipe("id-ID");

  constructor(private route: ActivatedRoute,
    private router: Router, private userService: UserService, private reminderService: ReminderService){
      this.reminder = new Reminder();
    }

  ngOnInit(){
    this.userService.findAll().subscribe((result) => {
      this.users = result;
    })
  }

  reminderForm: FormGroup = new FormGroup({  
    description : new FormControl(''),  
    repeated: new FormControl(''),
    email: new FormControl(''),
    scheduleDate : new FormControl(''),
    paymentDate : new FormControl(''),
    amount : new FormControl(''),

});  

onItemChange(data: any){
  this.reminder.repeated = data.target.defaultValue;
}


  onSubmit(){
    this.reminder.createdBy =  localStorage.getItem('email') || "null";
    this.reminder.description = this.reminderForm.controls['description'].value;
    this.reminder.amount = this.reminderForm.controls['amount'].value;
    this.reminder.scheduleDate = this.pipe.transform(this.reminderForm.controls['scheduleDate'].value, 'dd/MM/yyyy') || "";
    this.reminder.paymentDate = this.pipe.transform(this.reminderForm.controls['paymentDate'].value, 'dd/MM/yyyy') || "";
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



