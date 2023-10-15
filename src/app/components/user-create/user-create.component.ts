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
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
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
    repeatpassword: new FormControl('')
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
      console.log(result);
      Swal.fire({
        title: 'Create User Success',
      }).then((result) => {
          this.gotoUserList();
        })
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
//  openPopup() {
//     Flowbite.showPopup({
//       content: '<app-popup></app-popup>', // Komponen Angular untuk pop-up
//       width: '500px', // Lebar pop-up
//       height: '300px' // Tinggi pop-up
//     });
//   }

    //show-hide password
    password: string = '';
    showPassword: boolean = false;

    toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}

