import { Component } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reminder-create',
  templateUrl: './reminder-create.component.html',
  styleUrls: ['./reminder-create.component.css']
})
export class ReminderCreateComponent {
  
  simpleAlert(){
    Swal.fire(
      "Good job!", "You clicked the button!", "success");
  }
}



