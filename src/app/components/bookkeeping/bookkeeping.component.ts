import { Component, OnInit } from '@angular/core';
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

  minDate: string = "";
  maxDate: string = "";
  chosenYear: string = "";


  constructor(private transactionService: TransactionService, private categoryService: CategoryService, public router: Router) {
    this.pageBookkeeping = new PageBookkeeping();
    this.income = [];
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

  // date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
  // date2 = let FToday = formatDate(datecomingfromdb,'yyyy-MM-dd','en_US');

  // if(date1>date2){
  //   console.log('---date1 is greater----');
  //  }else{
  //   console.log('---date2 is greater-----');
  //  }

  changeFrom(data: any){
    console.log(data)
    this.fromDate = data;
    // this.pageBookkeeping.startDate = this.pipe.transform(data, 'dd/MM/yyyy') || "";
    // this.minDate = this.pipe.transform(data, 'YYYY-MM-dd') || "";
    // console.log(this.pageBookkeeping, this.minDate);
    if (this.toDate != null) {
      if(this.fromDate > this.toDate){
        Swal.fire({
          title: "Can't be later than the to date",
          icon:'warning'
        })
      }
      else{
        this.pageBookkeeping.startDate = this.pipe.transform(data, 'dd/MM/yyyy') || "";
        this.transactionService.findAllBookkeeping(this.pageBookkeeping).subscribe(data => {
          this.transactions = data.content;
        })
      }
    }    
    
  }

  changeTo(data: any){
    console.log(data)
    this.toDate = data;
    this.pageBookkeeping.endDate = this.pipe.transform(data, 'dd/MM/yyyy') || "";
    // this.maxDate = this.pipe.transform(data, 'YYYY-MM-dd') || "";
    // console.log(this.pageBookkeeping, this.maxDate);
    if (this.fromDate != null) {
      if(this.toDate < this.fromDate){
        Swal.fire({
          title: "Can't be earlier than the from date",
          icon:'warning'
        })
      }
      else{
        this.pageBookkeeping.endDate = this.pipe.transform(data, 'dd/MM/yyyy') || "";
        this.transactionService.findAllBookkeeping(this.pageBookkeeping).subscribe(data => {
          this.transactions = data.content;
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


  // downloadExcel(){
  //   window.location.href='https://kbdsi-icstar-d22f3974b870.herokuapp.com/api/transactions/export-to-excel';
  // }

  downloadExcel(){
    // console.log(this.chosenYear);
    this.transactionService.downloadExcel();
  }


}
