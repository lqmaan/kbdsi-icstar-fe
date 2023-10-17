import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';  
import {Transaction} from '../../models/transaction';
import {Category} from '../../models/category';
import {TransactionService} from '../../services/transaction.service';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-transaction-update',
  templateUrl: './transaction-update.component.html',
  styleUrls: ['./transaction-update.component.css']
})
export class TransactionUpdateComponent implements OnInit{
  category: Category[] = []
  transaction: Transaction;
  predesc: string;
  pretype: string;
  preamount: string;
  precategory: string;

  constructor(private route: ActivatedRoute,
    private router: Router, private transactionService: TransactionService, private categoryService: CategoryService){
      this.transaction = new Transaction()
    }

  ngOnInit(){
    if(localStorage.getItem('email') == "" || localStorage.getItem('email') == null){
      this.router.navigateByUrl('/login');
    }
    else
    {
    console.log(history.state)
    this.predesc = history.state.description;
    this.pretype =  history.state.type;
    this.precategory = history.state.category;
    this.preamount = history.state.amount;

    this.categoryService.findAll().subscribe(data => {
      this.category = data;
    })
    }
  }

  form: FormGroup = new FormGroup({  
    description : new FormControl(history.state.description,Validators.required),
    type : new FormControl(history.state.type, Validators.required),  
    category: new FormControl(history.state.category, Validators.required),
    amount : new FormControl(history.state.amount, Validators.required),
});  

  onItemChange(data: any){
    this.transaction.type = data.target.defaultValue;
  }

 onEdit(){

      this.transaction.transactionId = history.state.transactionId;
      this.transaction.name = this.form.controls['description'].value;
      this.transaction.description = this.form.controls['description'].value;
      this.transaction.amount =  this.form.controls['amount'].value;
      this.transaction.category = this.form.controls['category'].value;
      this.transaction.updatedBy = localStorage.getItem('email') || 'null'
    
    this.transactionService.editTransaction(this.transaction)
        .subscribe((result) => {
        Swal.fire({
          title: 'Edit Transaction Success',
        }).then((result) => {
            this.gotoTransactionList();
          })
        }, error => {
          Swal.fire({
            title: 'Edit Transaction Failed',
            icon:'error'
          })
          console.log(error);
        })
 }

 gotoTransactionList(){
  this.router.navigateByUrl('/transaction');
 }
}
