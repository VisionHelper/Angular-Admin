import { Component, OnInit } from '@angular/core';
declare var $ :any;
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category = {};
  categories = [];
  sub_Category = {};
  sub_Categories = [];
  constructor() { }

  ngOnInit() {
  }
  
  addCategory(): void{
    this.categories.push(this.category);
    $("#add-Category").modal("hide");
    this.category = {};
  }

  
  editCategory(category:any): void{
    this.category = Object.assign({},category);
    $("#add-Category").modal("show");

  }

  addSubCategory(): void{
    this.sub_Categories.push(this.sub_Category);
    $("#add-SubCategory").modal("hide");
    this.sub_Category = {};
  }

  editSubCategory(sub_Category:any): void{
    this.sub_Category = Object.assign({},sub_Category);
    $("#add-SubCategory").modal("show");

  }

}
