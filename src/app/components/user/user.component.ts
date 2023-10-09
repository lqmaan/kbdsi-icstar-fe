import { Component } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from '../user-create/user-create.component';
declare var Flowbite: any; 
// import Flowbite from 'flowbite';
import { Router } from '@angular/router';
// import { UserCreateComponent } from './components/user-create/user-create.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
// openPopup(): void {
//     Flowbite.show('#popupElementID'); // Gantikan dengan ID atau selektor yang benar
//   }
// constructor(public dialog: MatDialog) {}
// openPopup(): void {
//   const dialogRef = this.dialog.open(UserCreateComponent, {
//     width: '250px'
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     console.log('Dialog ditutup', result);
//     // Di sini Anda dapat menavigasi ke halaman lain jika diperlukan
//   });
//   }

constructor(private _dialog: MatDialog) {}

  openNewPage() {
    this._dialog.open(UserCreateComponent); // Ganti dengan rute tujuan yang sesuai
    // Flowbite.closePopup(); // Tutup pop-up setelah mengarahkan pengguna
  }
}
