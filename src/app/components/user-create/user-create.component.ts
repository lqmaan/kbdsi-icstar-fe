import { Component } from '@angular/core';
import Swal from 'sweetalert2';
// import Flowbite from 'flowbite';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
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

}

