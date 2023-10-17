import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';


import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent  implements OnInit{

  category: Category;
constructor
(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef: MatDialogRef<CategoryAddComponent>, private categoryService: CategoryService){
  this.category = new Category();
}

ngOnInit(): void{
}



categoryForm: FormGroup = new FormGroup({  
  name : new FormControl(''),  
}); 

addCategory(){
  this.category.categoryName = this.categoryForm.controls['name'].value;
  this.category.createdBy = localStorage.getItem('email') || 'null';
  this.categoryService.createCategory(this.category).subscribe((result) => {
    // this.transactions = data.content;
    Swal.fire({
      title: 'Create Category Success',
      icon:'success'
    }).then((result) => {
      this.dialogRef.close();
      })
    }, error => {
      if(error.status == 500){
        Swal.fire({
          title: 'Category is exist',
          icon:'error'
        })
      }
      else{
        Swal.fire({
          title: 'Create Category Failed',
          icon:'error'
        })
      }
      console.log(error);
    })
  
}
 close(){
  this.dialogRef.close();
 }
}
