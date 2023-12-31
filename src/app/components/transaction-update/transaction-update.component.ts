import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';  
import {Transaction} from '../../models/transaction';
import {Category} from '../../models/category';
import {TransactionService} from '../../services/transaction.service';
import {CategoryService} from '../../services/category.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-transaction-update',
  templateUrl: './transaction-update.component.html',
  styleUrls: ['./transaction-update.component.css']
})
export class TransactionUpdateComponent implements OnInit{
  category: Category[] = []
  transaction: Transaction;

  form: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private transactionService: TransactionService, 
    private categoryService: CategoryService, 
    private currencyPipe: CurrencyPipe,
    private fb : FormBuilder
    ){
      this.transaction = new Transaction()
    }

  ngOnInit(){
    if(localStorage.getItem('email') == "" || localStorage.getItem('email') == null){
      this.router.navigateByUrl('/login');
    }
    else
    {
    this.categoryService.findAll().subscribe(data => {
      this.category = data;
    })

    this.form = this.fb.group({  
      description : new FormControl(history.state.description,Validators.required),
      type : new FormControl(history.state.type, Validators.required),  
      category: new FormControl(history.state.category, Validators.required),
      amount : new FormControl(history.state.amount, Validators.required),
  });

this.form.valueChanges.subscribe(form => {
  if(form.amount){
    this.form.patchValue({
      amount: this.currencyPipe.transform(form.amount.toString().replace(/\D/g, '').replace(/^0+/,''), 'IDR', 'symbol', '1.0-0')
    }, {emitEvent : false})
  }
  })
    }
  }


  onItemChange(data: any){
    this.transaction.type = data.target.defaultValue;
  }

 onEdit(){
      this.transaction.transactionId = history.state.transactionId;
      this.transaction.name = this.form.controls['description'].value;
      this.transaction.description = this.form.controls['description'].value;
      let res = this.form.controls['amount'].value.replace(/[^0-9.-]+/g,"");
      let tmp = res.split('.').join("");
      this.transaction.amount = Number(tmp);
      this.transaction.category = this.form.controls['category'].value;
      this.transaction.updatedBy = localStorage.getItem('email') || 'null'
    this.transactionService.editTransaction(this.transaction)
        .subscribe((result) => {
        Swal.fire({
          title: 'Edit Transaction Success',
          icon:'success'
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
