import { Component } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';  
import {Transaction} from '../../models/transaction';
import {Category} from '../../models/category';
import {TransactionService} from '../../services/transaction.service';
import {CategoryService} from '../../services/category.service';


@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent {
  category: Category[] = [];
  transaction: Transaction;

  constructor(private route: ActivatedRoute,
    private router: Router, private transactionService: TransactionService, private categoryService: CategoryService){
      this.transaction = new Transaction();
    }

  ngOnInit(){
    this.categoryService.findAll().subscribe(data => {
      this.category = data;
    })
  }

  form: FormGroup = new FormGroup({  
    description : new FormControl(''),  
    type: new FormControl(''),
    category : new FormControl(''),
    amount : new FormControl(''),

});  


onItemChange(data: any){
  this.transaction.type = data.target.defaultValue;
  console.log(this.transaction)
}


  onSubmit(){
    // console.log(this.login)
    this.transaction.createdBy =  localStorage.getItem('email') || "null";
    this.transaction.name = this.form.controls['description'].value;
    this.transaction.description = this.form.controls['description'].value;
    // this.transaction.type = this.form.controls['type'].value;
    this.transaction.amount = this.form.controls['amount'].value;
    this.transaction.category = this.form.controls['category'].value;
    console.log(this.transaction)
    this.transactionService.createTransaction(this.transaction).subscribe((result) => {
      Swal.fire({
        title: 'Create Transaction Success',
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
