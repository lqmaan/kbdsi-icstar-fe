import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import {formatDate} from '@angular/common';
import {PageBookkeeping} from '../../models/page-bookkeeping';
import { DatePipe } from '@angular/common';
import {Transaction} from '../../models/transaction';
import {Category} from '../../models/category';
import {TransactionService} from '../../services/transaction.service';
import {CategoryService} from '../../services/category.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-bookkeeping',
  templateUrl: './bookkeeping.component.html',
  styleUrls: ['./bookkeeping.component.css']
})
export class BookkeepingComponent implements OnInit {
  pageBookkeeping: PageBookkeeping;
  transactions: Transaction[] = [];
  category: Category[] = [];
  income: Transaction[] = [];
  outcome: Transaction[] = [];
  totalMonth: number[] = [];
  totalYear: number[]= [];
  currDate : Date;
  pipe = new DatePipe("id-ID");
  fromDate: Date;
  toDate: Date;
  chosenYear: string = "";


  @ViewChild('inputFrom') fromDateInput: any;
  @ViewChild('inputTo') toDateInput: any;


  constructor(private transactionService: TransactionService, private categoryService: CategoryService, public router: Router) {
    this.pageBookkeeping = new PageBookkeeping();
  }

  ngOnInit(){
    if(localStorage.getItem('email') == "" || localStorage.getItem('email') == null){
      this.router.navigateByUrl('/login');
    }
    else
    {
    this.currDate = new Date();
    this.pageBookkeeping.pageNum = 0;
    this.pageBookkeeping.pageSize = 5;
    this.pageBookkeeping.year = "";
    this.pageBookkeeping.category = "";
    this.pageBookkeeping.startDate = "";
    this.pageBookkeeping.endDate = "";
    this.transactionService.findAllBookkeeping(this.pageBookkeeping).subscribe(data => {
      this.transactions = data.content;
    })
  
    this.transactionService.getIncome().subscribe(data => {
      this.income = data;
    })
    this.transactionService.getOutcome().subscribe(data => {
      this.outcome = data;
    })

    this.transactionService.getTotalMonth(this.currDate.getMonth()).subscribe(data => {
      this.totalMonth = data;
    })

    this.transactionService.getTotalYear(this.currDate.getFullYear()).subscribe(data => {
      this.totalYear = data;
    })
  
  
    this.categoryService.findAll().subscribe(data => {
      this.category = data;
    })
  }
  }


  changeFrom(data: any){
    console.log(data)
    this.fromDate = data;
    this.pageBookkeeping.startDate = this.pipe.transform(data, 'dd/MM/yyyy') || "";
    if (this.toDate != null) {
      if(this.fromDate > this.toDate){
        Swal.fire({
          title: "Can't be later than the to date",
          icon:'warning'
        })
      }
      else{
        this.pageBookkeeping.startDate = this.pipe.transform(this.fromDate, 'dd/MM/yyyy') || "";
        this.transactionService.findAllBookkeeping(this.pageBookkeeping).subscribe(result => {
          console.log(this.pageBookkeeping)
          this.transactions = result.content;
        })
      }
    }    
  }

  clear(){
    this.pageBookkeeping.category = "";
    this.pageBookkeeping.year = "";
    this.pageBookkeeping.startDate = "";
    this.fromDateInput.nativeElement.value = "";
    this.toDateInput.nativeElement.value = "";
  }

  changeTo(data: any){
    console.log(data)
    this.toDate = data;
    this.pageBookkeeping.endDate = this.pipe.transform(data, 'dd/MM/yyyy') || "";
    if (this.fromDate != null) {
      if(this.toDate < this.fromDate){
        Swal.fire({
          title: "Can't be earlier than the from date",
          icon:'warning'
        })
      }
      else{
        this.pageBookkeeping.endDate = this.pipe.transform(this.toDate, 'dd/MM/yyyy') || "";
        this.transactionService.findAllBookkeeping(this.pageBookkeeping).subscribe(result => {
          console.log(this.pageBookkeeping)
          this.transactions = result.content;
        })
      }
    }
    
  }

  changeCategory(data: any){
    this.pageBookkeeping.category = data;
    this.transactionService.findAllBookkeeping(this.pageBookkeeping).subscribe(data => {
      this.transactions = data.content;
    })
  }

  changeYear(data: any){
    this.pageBookkeeping.year = data;
    this.transactionService.findAllBookkeeping(this.pageBookkeeping).subscribe(data => {
      this.transactions = data.content;
    })
  }

  nextPage(){
    this.pageBookkeeping.pageNum += 1;
    this.transactionService.findAllBookkeeping(this.pageBookkeeping).subscribe(data => {
      this.transactions = data.content;
  })
}

  previousPage(){
    if(this.pageBookkeeping.pageNum != 0){
          this.pageBookkeeping.pageNum -= 1
          this.transactionService.findAllBookkeeping(this.pageBookkeeping).subscribe(data => {
            this.transactions = data.content;}
          )
      }
    else{
      this.pageBookkeeping.pageNum = 0;
    }
  }


  downloadExcel(){
    this.transactionService.downloadExcel();
  }


}
