import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import {formatDate} from '@angular/common';
import {PageTransaction} from '../../models/page-transaction';
import { DatePipe } from '@angular/common';
import {Transaction} from '../../models/transaction';
import {Category} from '../../models/category';
import {Delete} from '../../models/delete';
import {TransactionService} from '../../services/transaction.service';
import {CategoryService} from '../../services/category.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  pageTransaction: PageTransaction;
  transactions: Transaction[] = [];
  category: Category[] = [];
  totalMonth: number[] = [];
  currDate : Date;
  pipe = new DatePipe("id-ID");
  delete: Delete;


  constructor(private transactionService: TransactionService, private categoryService: CategoryService, public router: Router) {
    this.pageTransaction = new PageTransaction();
    this.delete = new Delete()
  }

  ngOnInit(){
    this.currDate = new Date();
    this.pageTransaction.pageNum = 0;
    this.pageTransaction.pageSize = 5;
    this.pageTransaction.description = "";
    this.transactionService.findAllTransaction(this.pageTransaction).subscribe(data => {
      this.transactions = data.content;
    })

    this.transactionService.getTotalMonth(this.currDate.getMonth()).subscribe(data => {
      this.totalMonth = data;
    })
  
    this.categoryService.findAll().subscribe(data => {
      this.category = data;
    })
  }
    
  
  handleSearch(input: string): void{
    this.pageTransaction.description = input;
    this.transactionService.findAllTransaction(this.pageTransaction).subscribe(data => {
      this.transactions = data.content;
    })
  }

  nextPage(){
    this.pageTransaction.pageNum += 1;
    this.transactionService.findAllTransaction(this.pageTransaction).subscribe(data => {
      this.transactions = data.content;
  })
}

  previousPage(){
    if(this.pageTransaction.pageNum != 0){
          this.pageTransaction.pageNum -= 1
          this.transactionService.findAllTransaction(this.pageTransaction).subscribe(data => {
            this.transactions = data.content;}
          )
      }
    else{
      this.pageTransaction.pageNum = 0;
    }
  }

  gotoEditTransation(transaction: Transaction){
    this.router.navigateByUrl('/transaction-update', {state: transaction});
  }

  confirmBox(transaction :Transaction){
    console.log("delete", transaction)
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.delete.id = transaction.transactionId;
        this.delete.updatedBy = localStorage.getItem("email") || "null";
        this.transactionService.deleteTransaction(this.delete).subscribe(result => {
          this.transactionService.findAllTransaction(this.pageTransaction).subscribe(data => {
            this.transactions = data.content;
          })
          if(result == "Transaction has been deleted"){
            Swal.fire(
              'Deleted!',
              'Transaction has been deleted.',
              'success'
            ) 
          }
        }, error => {
          Swal.fire({
            title: 'Edit Transaction Failed',
            icon:'error'
          })
          console.log(error);
        })
      }
    })
  }
}
