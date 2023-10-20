import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';


import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import {BudgetService} from '../../../services/budget.service';


@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit{


constructor
(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef: MatDialogRef<PrintComponent>, private budgetService: BudgetService){
}

ngOnInit(): void{
}

printForm: FormGroup = new FormGroup({  
  year : new FormControl(''),  
}); 

 close(){
  this.dialogRef.close();
 }

 downloadExcel(){
  this.budgetService.downloadExcel(this.printForm.controls['year'].value);
  this.close();
  }
}
