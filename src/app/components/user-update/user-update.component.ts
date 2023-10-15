import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';  
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  user: User;
  preemail: string;
  prename: string;
  password: string;
  prephone: string;

  constructor(private route: ActivatedRoute,
    private router: Router, private userService: UserService){
      this.user = new User()
    }

  ngOnInit(){
    console.log(history.state)
    this.preemail = history.state.email;
    this.prename =  history.state.name;
    this.prephone = history.state.phone;
  }

  form: FormGroup = new FormGroup({  
    email : new FormControl(''),
    name : new FormControl(''),  
    phone: new FormControl(''),
    password : new FormControl(''),
});  

 onEdit(){

      this.user.userId = history.state.userId;
      this.user.name = this.form.controls['name'].value;
      this.user.email = this.form.controls['email'].value;
      this.user.phone =  this.form.controls['phone'].value;
      this.user.roles =  history.state.roles;
      this.user.password = this.form.controls['password'].value;
      this.user.updatedBy = localStorage.getItem('email') || 'null'
    
      console.log(this.user)
    this.userService.editUser(this.user)
        .subscribe((result) => 
        {
          console.log(result)
        // this.gotoUserList();
      });
 }

 gotoUserList(){
  this.router.navigateByUrl('/user');
 }
     //show-hide password
    
    showPassword: boolean = false;

    toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
