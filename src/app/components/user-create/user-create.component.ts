import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
// import Flowbite from 'flowbite';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {User} from '../../models/user';
import {Transaction} from '../../models/transaction';
import {TransactionService} from '../../services/transaction.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit{
  user: User;

  constructor(private route: ActivatedRoute,
    private router: Router, private userService: UserService){
      this.user = new User();
    }

    ngOnInit(){
      if(localStorage.getItem('email') == "" || localStorage.getItem('email') == null){
        this.router.navigateByUrl('/login');
      }
    }

  form: FormGroup = new FormGroup({  
    email : new FormControl('', [Validators.required, Validators.email]),  
    name: new FormControl('', Validators.required),
    phone : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    repeatpassword: new FormControl('', Validators.required)
});  


  onSubmit(){
    this.user.createdBy =  localStorage.getItem('email') || "null";
    this.user.name = this.form.controls['name'].value;
    this.user.email = this.form.controls['email'].value;
    this.user.phone = this.form.controls['phone'].value;
    this.user.roles = "superadmin";
    if(this.form.controls['password'].value ==  this.form.controls['repeatpassword'].value){
    this.user.password = this.form.controls['password'].value;
    this.userService.createUser(this.user).subscribe((result) => {
      Swal.fire({
        title: 'Create User Success',
        icon:'success'
      }).then((result) => {
          this.gotoUserList();
        })
      }, error => {
          Swal.fire({
            title: 'Create User Failed',
            icon:'error'
          })
          console.log(error);
        })
    }
    else{
      Swal.fire({
        title: "Password doesn't match",
        icon: 'error'
      })
    }
    
  }

  gotoUserList(){
    this.router.navigate(['/user']);
  }

  simpleAlert(){
    Swal.fire(
      'simple Notification');
  }

  alertWithSuccees(){
    Swal.fire ( "Oops, something went wrong!" );
}

    //show-hide password
    showPassword: boolean = false;

    toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}

