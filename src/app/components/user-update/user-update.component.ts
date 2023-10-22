import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
    if(localStorage.getItem('email') == "" || localStorage.getItem('email') == null){
      this.router.navigateByUrl('/login');
    }
    else
    {
    this.preemail = history.state.email;
    this.prename =  history.state.name;
    this.prephone = history.state.phone;
    }
  }

  form: FormGroup = new FormGroup({  
    email : new FormControl('', [Validators.required, Validators.email]),
    name : new FormControl('', Validators.required),  
    phone: new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
});  

 onEdit(){

      this.user.userId = history.state.userId;
      this.user.name = this.form.controls['name'].value;
      this.user.email = this.form.controls['email'].value;
      this.user.phone =  this.form.controls['phone'].value;
      this.user.roles =  history.state.roles;
      this.user.password = this.form.controls['password'].value;
      this.user.updatedBy = localStorage.getItem('email') || 'null'
    
    this.userService.editUser(this.user)
        .subscribe((result) => 
        {
          Swal.fire({
            title: 'Edit User Success',
            icon:'success'
          }).then((result) => {
              this.gotoUserList();
            })
          }, error => {
            Swal.fire({
              title: 'Edit User Failed',
              icon:'error'
            })
            console.log(error);
          })
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
