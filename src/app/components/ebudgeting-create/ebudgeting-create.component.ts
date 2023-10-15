import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Budget} from '../../models/budget';
import {Transaction} from '../../models/transaction';
import {Category} from '../../models/category';
import {BudgetService} from '../../services/budget.service';
import {TransactionService} from '../../services/transaction.service';
import {CategoryService} from '../../services/category.service';


@Component({
  selector: 'app-ebudgeting-create',
  templateUrl: './ebudgeting-create.component.html',
  styleUrls: ['./ebudgeting-create.component.css']
})
export class EbudgetingCreateComponent implements OnInit {
  budget: Budget;
  category: Category[] = [];
  transaction: Transaction;

  constructor(private route: ActivatedRoute,
    private router: Router, private transactionService: TransactionService, private budgetService: BudgetService, private categoryService: CategoryService){
      this.budget = new Budget();
    }

  ngOnInit(){
    this.categoryService.findAll().subscribe(data => {
      this.category = data;
    })
  }

  form: FormGroup = new FormGroup({  
    name : new FormControl(''),  
    description : new FormControl(''),  
    type: new FormControl(''),
    category : new FormControl(''),
    amount : new FormControl(''),
    year : new FormControl('')  

});  


onItemChange(data: any){
  this.budget.type = data.target.defaultValue;
  console.log(this.transaction)
}


  onSubmit(){
    // console.log(this.login)
    this.budget.createdBy =  localStorage.getItem('email') || "null";
    this.budget.name = this.form.controls['name'].value;
    this.budget.description = this.form.controls['description'].value;
    this.budget.amount = this.form.controls['amount'].value;
    this.budget.category = this.form.controls['category'].value;
    this.budget.year = this.form.controls['year'].value;
    this.budgetService.createBudget(this.budget).subscribe((result) => {
      Swal.fire({
        title: 'Create Budget Success',
      }).then((result) => {
          this.gotoBudgetList();
        })
      }, error => {
        Swal.fire({
          title: 'Create Budget Failed',
          icon:'error'
        })
        console.log(error);
      })
  }

  gotoBudgetList(){
    this.router.navigate(['/ebudgetting']);
  }
}
