import { Component } from '@angular/core';
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
  selector: 'app-ebudgeting-update',
  templateUrl: './ebudgeting-update.component.html',
  styleUrls: ['./ebudgeting-update.component.css']
})
export class EbudgetingUpdateComponent {
  budget: Budget;
  category: Category[] = [];
  years: string[] = ['2023', '2024'];

  preyear: string;
  predesc: string;
  precategory: string;
  prename: string;
  pretype: string;
  preamount: number;


  constructor(private route: ActivatedRoute,
    private router: Router, private transactionService: TransactionService, private budgetService: BudgetService, private categoryService: CategoryService){
      this.budget = new Budget();
    }

  ngOnInit(){
    this.categoryService.findAll().subscribe(data => {
      this.category = data;
    })
    console.log(history.state);
    this.precategory = history.state.category;
  }

  form: FormGroup = new FormGroup({  
    name : new FormControl(history.state.name),  
    description : new FormControl(history.state.description),  
    type: new FormControl(history.state.type),
    category : new FormControl(history.state.category),
    amount : new FormControl(history.state.amount),
    year : new FormControl(history.state.year)  

});  


onItemChange(data: any){
  this.budget.type = data.target.defaultValue;
  console.log(this.budget)
}


  onSubmit(){
    // console.log(this.login)
    this.budget.budgetId = history.state.budgetId;
    this.budget.updatedBy =  localStorage.getItem('email') || "null";
    this.budget.name = this.form.controls['name'].value;
    this.budget.description = this.form.controls['description'].value;
    this.budget.amount = this.form.controls['amount'].value;
    this.budget.category = this.form.controls['category'].value;
    this.budget.year = this.form.controls['year'].value;
    this.budget.type =  this.form.controls['type'].value;
    console.log(this.budget)
    this.budgetService.editBudget(this.budget).subscribe((result) => {
      Swal.fire({
        title: 'Edit Budget Success',
      }).then((result) => {
          this.gotoBudgetList();
        })
      }, error => {
        Swal.fire({
          title: 'Edit Budget Failed',
          icon:'error'
        })
        console.log(error);
      })
  }

  gotoBudgetList(){
    this.router.navigate(['/ebudgeting']);
  }
}
