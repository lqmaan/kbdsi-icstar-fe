import { Component } from '@angular/core';
import Swal from 'sweetalert2';
// import Flowbite from 'flowbite';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {User} from '../../models/user';
import {Transaction} from '../../models/transaction';
import {TransactionService} from '../../services/transaction.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  user: User;

  constructor(private route: ActivatedRoute,
    private router: Router, private userService: UserService){
      this.user = new User();
    }

  form: FormGroup = new FormGroup({  
    email : new FormControl(''),  
    name: new FormControl(''),
    phone : new FormControl(''),
    password : new FormControl(''),
});  


  onSubmit(){
    this.user.createdBy =  this.form.controls['email'].value;;
    this.user.name = this.form.controls['name'].value;
    this.user.email = this.form.controls['email'].value;
    this.user.phone = this.form.controls['phone'].value;
    this.user.roles = "superadmin";
    this.user.password = this.form.controls['password'].value;
    this.userService.createUser(this.user).subscribe((result) => {
      console.log(result);
      Swal.fire({
        title: 'Register Success',
      }).then((result) => {
          this.gotoLogin();
        })
      })
    
    
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }
    password: string = '';
    showPassword: boolean = false;

    toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
