import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
// import Flowbite from 'flowbite';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {User} from '../../models/user';
import {Transaction} from '../../models/transaction';
import {TransactionService} from '../../services/transaction.service';
import {UserService} from '../../services/user.service';
import {NavbarService} from '../../services/navbar.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  user: User;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private userService: UserService,
    private navbarService: NavbarService){
      this.user = new User();
    }

    ngOnInit() : void {
      this.navbarService.hide();
    }

    ngOnDestroy() : void {
      this.navbarService.display();
    }

  form: FormGroup = new FormGroup({  
    email : new FormControl('', [Validators.required]),  
    name: new FormControl('', [ Validators.required]),
    phone : new FormControl('', [ Validators.required]),
    password : new FormControl('', [ Validators.required]),
});  

get formControl() {
  return this.form.controls;
}

  onSignUp(){
console.log(this.formControl)

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
        }, error => {
          Swal.fire({
            title: 'Register Failed',
            text: error
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
