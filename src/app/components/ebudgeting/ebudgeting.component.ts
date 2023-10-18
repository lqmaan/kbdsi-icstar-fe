import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatDialog, MatDialogConfig } from  '@angular/material/dialog';
import { ElementRef} from '@angular/core';
import {Modal} from 'bootstrap';

import { CategoryAddComponent } from '../category-add/category-add.component';
import {PrintComponent} from './print/print.component';

import {formatDate} from '@angular/common';
import {PageBudget} from '../../models/page-budget';
import { DatePipe } from '@angular/common';
import {Category} from '../../models/category';
import {Budget} from '../../models/budget';
import {Delete} from '../../models/delete';
import {CategoryService} from '../../services/category.service';
import {BudgetService} from '../../services/budget.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-ebudgeting',
  templateUrl: './ebudgeting.component.html',
  styleUrls: ['./ebudgeting.component.css'],
})
export class EbudgetingComponent implements OnInit {
  delete: Delete;
  pageBudget: PageBudget;
  budgets : Budget[] = []
  category: Category[] = [];
  totalYear: number[]= [];
  currDate : Date;
  currYear: string;
  pipe = new DatePipe("id-ID");
  chosenYear: string = "";


  constructor(public dialog: MatDialog, private budgetService: BudgetService, private categoryService: CategoryService, public router: Router) {
    this.pageBudget = new PageBudget();
    this.delete = new Delete();
  }

  ngOnInit(){
    if(localStorage.getItem('email') == "" || localStorage.getItem('email') == null){
      this.router.navigateByUrl('/login');
    }
    else
    {
    this.currDate = new Date();
    this.pageBudget.pageNum = 0;
    this.pageBudget.pageSize = 5;
    this.pageBudget.year = this.currDate.getFullYear().toString();
    this.currYear = this.currDate.getFullYear().toString();
    this.budgetService.findAll(this.pageBudget).subscribe(data => {
      this.budgets = data.content;
    })

    this.budgetService.getTotalYear(this.currDate.getFullYear()).subscribe(data => {
      this.totalYear = data;
    })
  
  
    this.categoryService.findAll().subscribe(data => {
      this.category = data;
    })
    }
  }

  changeYear(data: any){
    this.pageBudget.year = data;
    this.budgetService.findAll(this.pageBudget).subscribe(data => {
      this.budgets = data.content;
    })
  }

  nextPage(){
    this.pageBudget.pageNum += 1;
    this.budgetService.findAll(this.pageBudget).subscribe(data => {
      this.budgets = data.content;
  })
}

  previousPage(){
    if(this.pageBudget.pageNum != 0){
          this.pageBudget.pageNum -= 1
          this.budgetService.findAll(this.pageBudget).subscribe(data => {
            this.budgets = data.content;}
          )
      }
    else{
      this.pageBudget.pageNum = 0;
    }
  }

  confirmBox(budget: Budget){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.delete.id = budget.budgetId;
        this.delete.updatedBy = localStorage.getItem("email") || "null";
        this.budgetService.deleteBudget(this.delete).subscribe(result => {
          this.budgetService.findAll(this.pageBudget).subscribe(data => {
            this.budgets = data.content;
          })
          if(result == "Budget has been deleted"){
            Swal.fire(
              'Deleted!',
              'Budget has been deleted.',
              'success'
            ) 
          }
        }
        , error => {
            Swal.fire({
              title: 'Delete Budget Failed',
              icon:'error'
            })
            console.log(error);
          })
      } 
    })
  }

  gotoEditBudget(budget: Budget){
    this.router.navigateByUrl('/ebudgeting-update', {state: budget});
  }
  //   child: any;
  // show(modalRef:ElementRef){
  //   const modal=new Modal(modalRef.nativeElement);
  //   modal.show();
  // }
    child: any;
  show(modalRef:ElementRef){
    const modal=new Modal(modalRef.nativeElement);
    modal.show();
  }
  openModal(){
    const mdConfig = new MatDialogConfig();
    mdConfig.disableClose = false;
    mdConfig.hasBackdrop = true;
    mdConfig.width = "500px";
    mdConfig.height = "200px";

    this.dialog.open(CategoryAddComponent, mdConfig);
    }
  
  
  openGenerateExcel(){
    const mdConfig = new MatDialogConfig();
    mdConfig.disableClose = false;
    mdConfig.hasBackdrop = true;
    mdConfig.width = "500px";
    mdConfig.height = "auto";
    // mdConfig.panelClass = 'rounded';

    this.dialog.open(PrintComponent, mdConfig);
    }

}
