import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from '../user-create/user-create.component';

import { Router } from '@angular/router';
import {UserService} from '../../services/user.service';
import {PageUser} from '../../models/page-user';
import {User} from '../../models/user';
import {Delete} from '../../models/delete';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  pageUser : PageUser;
  delete: Delete;
  name: string;

  constructor(private _dialog: MatDialog, private userService: UserService, public router: Router) {
    this.pageUser = new PageUser();
    this.delete = new Delete();
  }

  ngOnInit(){
    if(localStorage.getItem('email') == "" || localStorage.getItem('email') == null){
      this.router.navigateByUrl('/login');
    }
    else
    {
    this.pageUser.name = "";
    this.pageUser.pageNum = 0;
    this.pageUser.pageSize = 5;
    this.userService.paginationUser(this.pageUser).subscribe(data => {
      this.users = data.content;
    })
  }
  }

  nextPage(){
    this.pageUser.pageNum += 1;
    this.userService.paginationUser(this.pageUser).subscribe(data => {
      this.users = data.content;
  })
}

  previousPage(){
    if(this.pageUser.pageNum != 0){
          this.pageUser.pageNum -= 1
          this.userService.paginationUser(this.pageUser).subscribe(data => {
            this.users = data.content;}
          )
      }
    else{
      this.pageUser.pageNum = 0;
    }
  }

  handleSearch(input: string): void{
    this.pageUser.name = input;
    this.userService.paginationUser(this.pageUser).subscribe(data => {
      this.users = data.content;
    })
  }

  gotoEditUser(user: User){
    this.router.navigateByUrl('/user-update', {state: user});
  }

  confirmBox(user: User){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.delete.id = user.userId;
        this.delete.updatedBy = localStorage.getItem("email") || "null";
        this.userService.deleteUser(this.delete).subscribe(result => {
          this.userService.paginationUser(this.pageUser).subscribe(data => {
            this.users = data.content;
          })
          if(result == "User has been deleted"){
            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            ) 
          }
        }
        , error => {
            Swal.fire({
              title: 'Delete User Failed',
              icon:'error'
            })
            console.log(error);
          })
      }
    })
  }

  // openNewPage() {
  //   this._dialog.open(UserCreateComponent); 
  // }

  downloadExcel(){
    window.location.href='https://kbdsi-icstar-d22f3974b870.herokuapp.com/api/users/export-to-excel';
  }
}

export const APP_URLS = {
  'excel': 'https://kbdsi-icstar-d22f3974b870.herokuapp.com/api/users/export-to-excel',
};