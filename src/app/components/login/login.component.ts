import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';  
import {Login} from '../../models/login';
import {LoginService} from "../../services/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['../../../dist/output.css']
})
export class LoginComponent {
  private login: Login;

  constructor(private route: ActivatedRoute,
      private router: Router,
      private loginService: LoginService
    ){
      this.login = new Login();
    }


    form: FormGroup = new FormGroup({  
      email : new FormControl('' ),  
      password : new FormControl('')
  });  

    onSignIn(){
      // console.log(this.login)
      this.login.email =  this.form.controls['email'].value;
      this.login.password = this.form.controls['password'].value
      console.log(this.login)
      this.loginService.login(this.login)
        .subscribe((result) => 
        {
          console.log(result)
        localStorage.setItem('id', result.id);
        localStorage.setItem('email', result.email);
        localStorage.setItem('name', result.name);
        localStorage.setItem('phone', result.phone);
        localStorage.setItem('roles', result.roles);
        this.gotoUserList();
      });
    }

    gotoUserList(){
      this.router.navigate(['/user']);
    }

    //show-hide password
    password: string = '';
    showPassword: boolean = false;

    toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
