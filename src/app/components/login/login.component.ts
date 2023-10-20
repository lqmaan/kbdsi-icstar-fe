import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';  
import {Login} from '../../models/login';
import {LoginService} from "../../services/login.service";
import {NavbarService} from '../../services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['../../../dist/output.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  private login: Login;

  constructor(private route: ActivatedRoute,
      private router: Router,
      private loginService: LoginService,
      private navbarService: NavbarService
    ){
      this.login = new Login();
    }

    ngOnInit() : void {
      this.navbarService.hide();
    }

    ngOnDestroy() : void {
      this.navbarService.display();
    }


    form: FormGroup = new FormGroup({  
      email : new FormControl('' ),  
      password : new FormControl('')
  });  

    onSignIn(){
      this.login.email =  this.form.controls['email'].value;
      this.login.password = this.form.controls['password'].value
      console.log(this.login)
      this.loginService.login(this.login)
        .subscribe((result) => 
        {
        localStorage.setItem('id', result.id);
        localStorage.setItem('email', result.email);
        localStorage.setItem('name', result.name);
        localStorage.setItem('phone', result.phone);
        localStorage.setItem('roles', result.roles);
        this.gotoBookkeeping();
      }, (error) => {
        if(error.status == 404){
          Swal.fire({
            title: "Email doesn't exist",
            icon:'error'
          })
        }
        else if(error.status == 400){
          Swal.fire({
            title: 'Wrong Password',
            icon:'error'
          })
        }
      });
    }

    gotoBookkeeping(){
      this.router.navigate(['/bookkeeping']);
    }

    //show-hide password
    password: string = '';
    showPassword: boolean = false;

    toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
