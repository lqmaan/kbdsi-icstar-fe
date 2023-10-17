import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent  implements OnInit{
constructor
(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef: MatDialogRef<CategoryAddComponent>){
}

ngOnInit(): void{
}

addCategory(){
  this.dialogRef.close();
}

}
