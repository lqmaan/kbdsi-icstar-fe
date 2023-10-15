import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import {formatDate} from '@angular/common';
import {PageBudget} from '../../models/page-budget';
import { DatePipe } from '@angular/common';
import {Category} from '../../models/category';
import {Budget} from '../../models/budget';
import {CategoryService} from '../../services/category.service';
import {BudgetService} from '../../services/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ebudgeting',
  templateUrl: './ebudgeting.component.html',
  styleUrls: ['./ebudgeting.component.css']
})
export class EbudgetingComponent implements OnInit {

  pageBudget: PageBudget;
  budgets : Budget[] = []
  category: Category[] = [];
  // income: Budget[] = [];
  // outcome: Budget[] = [];
  // totalMonth: number[] = [];
  totalYear: number[]= [];
  currDate : Date;
  currYear: string;
  pipe = new DatePipe("id-ID");


  constructor(private budgetService: BudgetService, private categoryService: CategoryService, public router: Router) {
    this.pageBudget = new PageBudget();
    // this.income = [];
  }

  ngOnInit(){
    this.currDate = new Date();
    this.pageBudget.pageNum = 0;
    this.pageBudget.pageSize = 5;
    this.pageBudget.year = this.currDate.getFullYear().toString();
    this.currYear = this.currDate.getFullYear().toString();
    this.budgetService.findAll(this.pageBudget).subscribe(data => {
      this.budgets = data.content;
    })
  
    // this.transactionService.getIncome().subscribe(data => {
    //   this.income = data;
    // })
    // this.transactionService.getOutcome().subscribe(data => {
    //   this.outcome = data;
    // })

    // this.transactionService.getTotalMonth(this.currDate.getMonth()).subscribe(data => {
    //   this.totalMonth = data;
    // })

    this.budgetService.getTotalYear(this.currDate.getFullYear()).subscribe(data => {
      this.totalYear = data;
    })
  
  
    this.categoryService.findAll().subscribe(data => {
      this.category = data;
    })
  }

  changeYear(data: any){
    this.pageBudget.year = data;
    this.budgetService.findAll(this.pageBudget).subscribe(data => {
      this.budgets = data.content;
    })
  }

  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        // Swal.fire({
        //   title: 'Edit Transaction Success',
        // }).then((result) => {
        //     this.gotoTransactionList();
        //   })
        // }, error => {
        //   Swal.fire({
        //     title: 'Edit Transaction Failed',
        //     icon:'error'
        //   })
        //   console.log(error);
        // }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
