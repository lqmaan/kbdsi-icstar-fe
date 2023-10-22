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
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit{
  category: Category[] = [];
  transaction: Transaction;
  tmpAmount : number;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private transactionService: TransactionService, 
    private categoryService: CategoryService,
    private currencyPipe: CurrencyPipe,
    private fb: FormBuilder
    ){
      this.transaction = new Transaction();
      this.tmpAmount = 0
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
            description : new FormControl('', Validators.required),  
            type: new FormControl('', Validators.required),
            category : new FormControl('', Validators.required),
            amount : new FormControl('', Validators.required),
        
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


  onSubmit(){
    this.transaction.createdBy =  localStorage.getItem('email') || "null";
    this.transaction.name = this.form.controls['description'].value;
    this.transaction.description = this.form.controls['description'].value;
    // this.transaction.amount = this.form.controls['amount'].value;
    let res = this.form.controls['amount'].value.replace(/[^0-9.-]+/g,"");
    let tmp = res.split('.').join("");
    this.transaction.amount = Number(tmp);
    this.transaction.category = this.form.controls['category'].value;
    this.transactionService.createTransaction(this.transaction).subscribe((result) => {
      Swal.fire({
        title: 'Create Transaction Success',
        icon:'success'
      }).then((result) => {
          this.gotoTransactionList();
        })
      }, error => {
        Swal.fire({
          title: 'Create Transaction Failed',
          icon:'error'
        })
        console.log(error);
      })
  }

  gotoTransactionList(){
    this.router.navigate(['/transaction']);
  }
}
