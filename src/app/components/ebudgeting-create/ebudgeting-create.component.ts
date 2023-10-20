import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Budget} from '../../models/budget';
import {Transaction} from '../../models/transaction';
import {Category} from '../../models/category';
import {BudgetService} from '../../services/budget.service';
import {TransactionService} from '../../services/transaction.service';
import {CategoryService} from '../../services/category.service';

import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-ebudgeting-create',
  templateUrl: './ebudgeting-create.component.html',
  styleUrls: ['./ebudgeting-create.component.css']
})
export class EbudgetingCreateComponent implements OnInit {
  budget: Budget;
  category: Category[] = [];
  years: string[] = ['2023', '2024'];
  form: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private budgetService: BudgetService,
    private categoryService: CategoryService,
    private currencyPipe: CurrencyPipe,
    private fb: FormBuilder){
      this.budget = new Budget();
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
     name : new FormControl(''),  
    description : new FormControl(''),  
    type: new FormControl(''),
    category : new FormControl(''),
    amount : new FormControl(''),
    year : new FormControl('')  
        
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
  this.budget.type = data.target.defaultValue;
}


  onSubmit(){
    this.budget.createdBy =  localStorage.getItem('email') || "null";
    this.budget.name = this.form.controls['name'].value;
    this.budget.description = this.form.controls['description'].value;
    let res = this.form.controls['amount'].value.replace(/[^0-9.-]+/g,"");
    let tmp = res.split('.').join("");
    this.budget.amount = Number(tmp);
    this.budget.category = this.form.controls['category'].value;
    this.budget.year = this.form.controls['year'].value;
    this.budgetService.createBudget(this.budget).subscribe((result) => {
      Swal.fire({
        title: 'Create Budget Success',
        icon:'success'

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
    this.router.navigate(['/ebudgeting']);
  }
}
